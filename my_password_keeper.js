"use strict";

var Address2UserStorage = function () {
    LocalContractStorage.defineMapProperty(this, "addressUserStorageMap");
};


Address2UserStorage.prototype = {
    init: function () {
        //todo
    },

    save: function (key, value) {
        let from = Blockchain.transaction.from;

        let recordList = this.addressUserStorageMap.get(from);

        if (!recordList) {
            recordList = [];
            recordList[0] = {};
            recordList[0].key = value;
        } else {
            let nextIndex = recordList.length;
            recordList[nextIndex] = {};
            recordList[nextIndex].key = value;
        }

        return this.addressUserStorageMap.put(from, recordList);
    },

    get: function () {
        let from = Blockchain.transaction.from;

        let recordList = this.addressUserStorageMap.get(from);

        let resultList = [];
        let j = 0;

        if (!recordList){
            return "";
        } else {
            let len = recordList.length;
            for (let i = 0; i < len; i++) {
                if (recordList[i].hasOwnProperty("isDeleted") && recordList[i].isDeleted === 1) { // save for future
                    continue;
                }
                resultList[j++] = recordList[i];
            }
        }
        return resultList;
    }
};

module.exports = Address2UserStorage;