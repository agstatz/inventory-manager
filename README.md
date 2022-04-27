# inventory-manager

An inventory manager application for CS 348 Information Systems

-   Uses MySQL\*\*, Python 3.7+

-   Make sure to run the following commands locally to have
-   the correct packages installed

-   pip install django
-   pip install django-cors-headers
-   pip install djangorestframework
-   pip install mysqlclient
-   pip install wheel

To install the node modules necessary to run the application, make sure to cd to inventory_manager/frontend/,
then run the command ```npm install```

To run the development environment, follow the steps here:
- In the first terminal run:
``` cd /inventory_manager/
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
```
- In the second terminal run:
```
    cd /inventory_manager/frontend
    npm run dev
```
Access the web interface at http://localhost:8000
