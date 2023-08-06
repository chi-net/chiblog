# WIP
# chiblog deb makefile
# Copyright 2023 dabao1955

.PHONY: all
all: build

install-depends: yarn.lock
	@yarn install --frozen-lockfile
build:
	@yarn run build

.PHONY : clean

clean :
	-rm -rf chiblog/.output 
