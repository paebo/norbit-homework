import csv
import time

with open('./data/line1.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')

    next(csv_reader)

    for line in csv_reader:
        print(line)
        time.sleep(1)
