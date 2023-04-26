const { DataTypes, where } = require('sequelize');
const { sequelize } = require("../db_connector");

class Stack {
    constructor() {
        this.items = [];
    }

    add(element) {
        if (this.items.length == 5) {
            this.remove()
        }
        this.items.push(element);
    }

    remove() {
        if (this.items.length > 0) {
            this.items.pop();
        }
    }

    getString() {
        let toWriteToDb = this.items[0];
        for (var i = 1; i < this.items.length; i++) {
            toWriteToDb = toWriteToDb.concat("|X|X|X|***", this.items[i]);
        }
        return toWriteToDb;
    }

    clear() {
        this.items = [];
    }
}

const RecentlyOpened = sequelize.define("RecentlyOpened", {
    recentlyOpenedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.INTEGER
    },
    recentList: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { timestamps: false });

async function addToTheList(recentlyOpenedId, customerId, workspace) {
    if (!recentlyOpenedId || !customerId || !workspace) {
        throw Error("All Fields are required");
    }
    const exist = await RecentlyOpened.findOne({ where: { recentlyOpenedId: recentlyOpenedId } });
    if (exist) {
        let stack = new Stack();
        let recentList = exist.toJSON().recentList;
        if (recentList == "") {
            stack.add(`${workspace}|X|X|X|***`);
            await RecentlyOpened.update({ recentList: stack.getString() }, { where: { recentlyOpenedId: recentlyOpenedId } })
        } else {
            let myArray = recentList.split("|X|X|X|***");
            if (!myArray.includes(workspace)) {
                stack.add(workspace)
                let i = myArray.length;
                let count = 0;
                while (i > 0) {
                    if (count > i + 2) {
                        break;
                    }
                    if (myArray[count] != "") {
                        stack.add(myArray[count]);
                    }
                    count++;
                    i--;
                }
                await RecentlyOpened.update({ recentList: stack.getString() }, { where: { recentlyOpenedId: recentlyOpenedId } })
            }
        }
    } else {
        await RecentlyOpened.create({
            customerId: customerId,
            recentList: `${workspace}|X|X|X|***`
        })
    }
}

async function getListByUserId(customerId) {
    if (!customerId) {
        throw Error('customerId required');
    }
    let list = await RecentlyOpened.findOne({ where: { customerId: customerId } });
    if (!list) {
        list = RecentlyOpened.create({
            customerId: customerId,
            recentList: ""
        })
    }

    return list;
}

exports.addToTheList = addToTheList;
exports.getListByUserId = getListByUserId;