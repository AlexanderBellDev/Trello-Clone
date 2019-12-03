cf login -a api.run.pivotal.io -u alex@alexanderbell.dev -o AlexanderBellDev19
cd C:\Users\aspol\Documents\trelloclone\src\main\trellofrontend
call ng build --configuration=production
call cf push
