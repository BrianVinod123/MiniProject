import sqlite3
import csv
def importdb(db):
    conn=sqlite3.connect(db)
    cur=conn.cursor()
    cur.execute("SELECT NAME FROM sqlite_master WHERE type='table';")
    res=cur.fetchall()
    table_names=[i[0] for i in res]
    print(table_names)
    if res!=None:
        for name in table_names:
            cur.execute(f"SELECT * from {name};")
            res=cur.fetchall()
            with open(f"Datasets/{name}.csv",'w+',newline='') as csvfile:
                writer=csv.writer(csvfile)
                writer.writerow([i[0] for i in cur.description])
                print(res[1])
                for row in res[1:]:
                    writer.writerow(row)
    else:
        print('error')
        exit(0)
importdb('event.db')


