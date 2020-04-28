#!/bin/bash

# setup.sh - Use this to install packages, setup conf.env and see if you can connect to the matcha database
# Run `sh src/setup/setup.sh` where the `.git` file is stored.

echo "I suggest using pure Windows, Ubuntu or Max. None of the WSL or WSL 2 bullshit."
echo "WSL 1/2 is slower than pure Windows, so there's no reason to use it for Web Development if it's almost just as easy to setup."

src/setup/setup.sh