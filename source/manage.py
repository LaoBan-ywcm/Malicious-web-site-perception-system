# -*- coding: utf-8 -*-
'''
    Author: qiuqi
    Date:   2018-02-28 14:51:48
    Last Modified by:   LaoBan-ywcm
    Last Modified time: 2018-04-28 16:31:17
'''
from flask_script import Manager, Server

from application.app import app


manager = Manager(app)

manager.add_command("runserver",
    Server(
        host='127.0.0.1',
        port=8000,
        ))


if __name__ == '__main__':
    app.run(
            threaded=True,
            host='127.0.0.1',
            port=8000,
        )
