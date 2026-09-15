import csv
import hashlib
import hmac
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent

PRIVATE_DIR = PROJECT_ROOT / "local_private"

INPUT_FILE = PRIVATE_DIR / "participant_codes.csv"
SECRET_FILE = PRIVATE_DIR / "study_secret.txt"
OUTPUT_FILE = PRIVATE_DIR / "participant_registry.csv"


def load_secret() -> bytes:
    if not SECRET_FILE.exists():
        raise FileNotFoundError(
            f"Secret non trovato: {SECRET_FILE}"
        )

    secret_hex = SECRET_FILE.read_text(
        encoding="utf-8"
    ).strip()

    try:
        return bytes.fromhex(secret_hex)
    except ValueError as exc:
        raise ValueError(
            "study_secret.txt non contiene "
            "un valore esadecimale valido."
        ) from exc


def create_study_id(
    participant_code: str,
    secret: bytes,
) -> str:
    return hmac.new(
        secret,
        participant_code.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()


def create_registry() -> None:
    if not INPUT_FILE.exists():
        raise FileNotFoundError(
            f"File codici non trovato: {INPUT_FILE}"
        )

    secret = load_secret()

    rows = []

    with INPUT_FILE.open(
        "r",
        newline="",
        encoding="utf-8",
    ) as file:
        reader = csv.DictReader(file)

        for row in reader:
            code = row["code"].strip().upper()

            study_id = create_study_id(
                code,
                secret,
            )

            rows.append({
                "study_id": study_id,
                "pre_completed": "false",
                "post_completed": "false",
            })

    with OUTPUT_FILE.open(
        "w",
        newline="",
        encoding="utf-8",
    ) as file:
        writer = csv.DictWriter(
            file,
            fieldnames=[
                "study_id",
                "pre_completed",
                "post_completed",
            ],
        )

        writer.writeheader()
        writer.writerows(rows)

    print()
    print(
        f"Creati {len(rows)} study_id pseudonimi."
    )
    print("File generato:")
    print(OUTPUT_FILE)


if __name__ == "__main__":
    create_registry()