
# For each service belonging to your project, add a reference to its
# generated source file to the command below.
./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals --excludePrivate --excludeProtected \
   --out ./doc \
   ./direct-link/v1.ts \
    ./transit-gateway/v1.ts \
    --target "ES5"