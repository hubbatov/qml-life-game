import QtQuick 2.3
import QtQuick.Window 2.2

import "logic.js" as Logic

Window {
	id: lifeField

	color: "white"

	visible:  true

	property int xcount: 100
	property int ycount: 100

	width: 500
	height: 500

	ListModel {
		id: cellsModel
	}

	GridView{
		id: view

		anchors.fill: parent
		model: cellsModel

		cellWidth: lifeField.width / xcount
		cellHeight: lifeField.height / ycount

		delegate: Rectangle{
			width: view.cellWidth
			height: view.cellHeight
			color: alive ? "black" : "transparent"
		}
	}

	Timer{
		id: lifeTimer

		interval: 300
		repeat: true

		running: true

		onTriggered: {
			console.time("lifeCycle")
			Logic.lifeCycle()
			console.timeEnd("lifeCycle")
		}
	}

	Component.onCompleted: {
		Logic.initializeRandom(xcount, ycount)
	}
}

