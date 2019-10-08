#!/bin/bash

# This script will set up all NodeSDR core modules
# If modules already exist, they will be rebased back to their master. Merge conflicts should be resolved manually
# You can skip the building of any modules by commenting them out in the list below
NodeSDR_CORE_MODULES=(
    nodesdr-core-sdr-controls
    nodesdr-core-frontend
    nodesdr-adsb-decoder
    nodesdr-shipping-movements
)

for module in "${NodeSDR_CORE_MODULES[@]}"; do

    cd app/modules

    if [ ! -d $module ]; then
        git clone https://github.com/barrygee/$module.git
    fi
        
    cd $module
        git checkout master
        git pull origin master
    
    cd ../../../

done


NodeSDR_CUSTOM_MODULES=(
    # https://github.com/barrygee/SOME-MODULE.git
    # https://github.com/barrygee/ANOTHER_MODULE.git
)

for moduleSourceURL in "${NodeSDR_CUSTOM_MODULES[@]}"; do

	cd app/modules

	if [ ! -d $moduleSourceURL ]; then
        git clone $moduleSourceURL
    fi
        
    # Get module name
    # Regex gets text between final '/' and '.git' in each NodeSDR_CUSTOM_MODULES URL
    # ${moduleSourceURL%.git} gets all text upto but not including '.git'
    # ${dir##*/} gets all text from but not including the final '/'
    dir=${moduleSourceURL%.git} && dir=${dir##*/}

   	cd $dir
    	git checkout master
    	git pull origin master

    cd ../../../

done