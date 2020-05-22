"""
Implements the functions necessary to access every API
function without actually needing a visual interface.
"""


import os
import sys
import json
import requests


def sign_in(link, email, password):
    """Creates a new user."""
    payload = {
        "email": email,
        "password": password,
    }
    return requests.post(f"{link}/sign-in", json=payload).json()


def log_in(link, email, password):
    """Creates a new user."""
    payload = {
        "email": email,
        "password": password,
    }
    return requests.post(f"{link}/log-in", json=payload).json()


def open_endpoint(link, jwt_file=None):
    return requests.get(f"{link}/examples/open-endpoint").json()


def closed_endpoint(link, jwt_file=None):
    if jwt_file:
        with open(jwt_file, "r") as jwt_raw:
            jwt_string = jwt_raw.read().strip()
        headers = {
            "Authorization": f"Bearer {jwt_string}"
        }
    else:
        headers = {}
    return requests.get(
        f"{link}/examples/closed-endpoint",
        headers=headers
    ).json()


if __name__ == "__main__":
    LINK = "http://localhost:3000"
    COMMANDS = {
        "sign_in":         sign_in,
        "log_in":          log_in,
        "open_endpoint":   open_endpoint,
        "closed_endpoint": closed_endpoint,
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
