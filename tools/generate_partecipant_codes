import argparse
import csv
import secrets
from pathlib import Path


ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
CODE_LENGTH = 10

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "local_private"
OUTPUT_FILE = OUTPUT_DIR / "participant_codes.csv"


def generate_code(length: int = CODE_LENGTH) -> str:
    return "".join(
        secrets.choice(ALPHABET)
        for _ in range(length)
    )


def generate_unique_codes(count: int) -> list[str]:
    codes: set[str] = set()

    while len(codes) < count:
        codes.add(generate_code())

    return sorted(codes)


def create_csv(count: int) -> None:
    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    codes = generate_unique_codes(count)

    with OUTPUT_FILE.open(
        "w",
        newline="",
        encoding="utf-8",
    ) as file:
        writer = csv.writer(file)

        writer.writerow([
            "code",
            "pre_completed",
            "post_completed",
            "notes",
        ])

        for code in codes:
            writer.writerow([
                code,
                "false",
                "false",
                "",
            ])

    print()
    print(f"Creati {count} codici.")
    print(f"File salvato in:")
    print(OUTPUT_FILE)


def ask_number_of_codes() -> int:
    while True:
        try:
            value = input(
                "Quanti codici vuoi generare? "
            )

            count = int(value)

            if count <= 0:
                print(
                    "Inserisci un numero maggiore di 0."
                )
                continue

            return count

        except ValueError:
            print(
                "Inserisci un numero intero valido."
            )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description=(
            "Genera codici casuali per i partecipanti "
            "allo studio."
        )
    )

    parser.add_argument(
        "--count",
        type=int,
        help="Numero di codici da generare",
    )

    args = parser.parse_args()

    if args.count is not None:
        if args.count <= 0:
            parser.error(
                "--count deve essere maggiore di 0"
            )

        count = args.count

    else:
        count = ask_number_of_codes()

    create_csv(count)