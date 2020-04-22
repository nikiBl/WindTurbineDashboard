# desktop_cleaner.py


# you want to loop through the desktop, open a file and if it is a png, jpg, chuck it into the screenshot folder
import ogr, os, sys, osr 

list = os.listdir()

for filename in list:
    print(filename)