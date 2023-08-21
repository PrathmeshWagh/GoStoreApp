============ START COMMANDS ============

Have listed all the available commands in the package.json, will be breifing each command here

```bash

yarn start
yarn reset

```
These two commands are used to start metro you can use any one of them
yarn start ---> does a normal start of metro
yarn reset ---> clears cache and the starts it
node:clean ---> for reinstalling node modules

============ START IOS ============

```bash

ios:pod:reset ---> pod reset, bascially deleting and installing pods
ios:clean ---> clean build folder, deleting cache and derived folder
ios:pod:install ---> pod installing
ios:bundle:assets ---> ios bundle start
ios:dev ---> starting ios in development mode with available simulators(local)
ios:beta ---> starting ios in beta mode with available simulators(local)
ios:prod ---> starting ios in production mode with available simulators(local)
ios:dev-release --> starting ios in development release mode with available simulators
ios:beta-release --> starting ios in beta release mode with available simulators
ios:prod-release --> starting ios in production release mode with available simulators

```

============ END IOS ============

============ END COMMANDS ============

============ FOLDER STRUCTURE ============

Always separate business logic and views. Views will be components.
Components should just be plain react native elemnets.
and move all the business logic to hooks folder with their named hook by that 
code will be easy to read.

```bash

{name_of_module}/${file_name}.api.ts  ex: product/get_product.api.ts

```
this will be the default folder sturucture for all the folders


api  ---> all the http calls will be going through this folder

context  ---> all state management goes inside this folder

hooks  ---> all the business logic will be going inside the hooks

============ END  FOLDER STRUCTURE ============
