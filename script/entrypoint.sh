#!/bin/bash

if [ "$MODE" == "development" ]; then
	CONFIG_OUTFILE="/app/angular/src/assets/config.json"

	# Clean cached version, if any
	if [ -f "$CONFIG_OUTFILE" ]; then
		rm -f $CONFIG_OUTFILE
	fi
else
	CONFIG_OUTFILE="/app/angular/dist/assets/config.json"
fi
