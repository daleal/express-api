"""
Implements the functions necessary to access every API
function without actually needing a visual interface.
"""


import os
import sys
import json
import requests


def create_user(link, email, password):
    """Creates a new user."""
    payload = {
        "email": email,
        "password": password,
    }
    return requests.post(f"{link}/users/create", json=payload).json()


if __name__ == "__main__":
    LINK = "http://localhost:3000"
    COMMANDS = {
        "create_user": create_user,
    }

    try:
        RESPONSE = COMMANDS[sys.argv[1]](LINK, *sys.argv[2:])
    except IndexError:
        if len(sys.argv) <= 1:
            print("\n\n\n\tInvalid script call. To use the script, run:")
            print("\tpython3 ghost_client.py command *args")
            print("\tWhere *args are the arguments separated by space and "
                  "command corresponds to one of the following:")
            print(f'\t\t{", ".join(COMMANDS.keys())}\n\n')
            sys.exit(1)
    try:
        print(json.dumps(RESPONSE, indent=2, sort_keys=False))
    except TypeError:
        print(RESPONSE.text)
