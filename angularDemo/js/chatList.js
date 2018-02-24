'use strict';
angular.module('dataBaseServiceModule', [])
	.factory('dataBaseService', function() {
		return {
			qrCodeCount:3,
			wxList: {
				//				"1": {
				//					"userName": "@59d7d1820c72b6edae119e86fe28db71968e9e592326e064d1f49363592aa4eb",
				//					"cId": 1,
				//					"headImgUrl": "D:/51zan\\headers\\1.png",
				//					"nickName": "爱佳",
				//					"uin": 31148870，
				//					"hasInit":false
				//				},
			},
			currentContacts: {
				cId: "",
				hasInit:true,
				list: {
					groupList: [],
					groupCount:{
						size:"",
						page:""
					},
					userCount:{
						size:"",
						page:""
					},
					userList: 
					[
//					{
//						"userName": "@99e9cd56d3aaa46b1b844c1b83436f1a081f63318e827537fff59c9f4ef4c87b3",
//						"keyWord": "",
//						"nickName": "花开半夏",
//						"memberList": [],
//						"city": "长宁",
//						"remarkName": "",
//						"headImgUrl": "file:///d:/51zan\\chat\\my_file\\0_@99e9cd56d3aaa46b1b844c1b83436f1a081f63318e827537fff59c9f4ef4c87b.png",
//						"pyInitial": "HKBX",
//						"province": "上海",
//						"sex": "2",
//						"isOwner": "0",
//						"memberCount": "0",
//						"chatContact": {
//							"type": 0,
//							"flag": "花开半夏",
//							"cId": 1,
//							"isChating": null,
//							"chatStatus": 2,
//							"ccId": null,
//							"ccgId": null
//						},
//						"contactList": null
//					}
					],
					searchList:[],
					searchCount:{
						size:'',
						page:''
					}
				}
			},
			chatList: {
				//key cId_userName
				//				{
				//								myData: dataBaseService.wxList[item.cId],
				//								chatUserData: item,
				//								chatContent: [],
				//								unreadCount: 0,
				//								lastTime:new Date().getTime()
				//							}
			},
			systemInfo: {
				//objKey = cId {
				//				myData: dataBaseService.wxList[objKey], 
				//				cId: objKey,
				//				chatContent: [],
				//				unreadCount: 0}
			}
		}
	})
	.factory('chatListSearch',function(dataBaseService){
		return function(aKey){
			for(let idx in dataBaseService.chatList){
				if(dataBaseService.chatList[idx].objKey==aKey){
					return idx
				}
			}
			return false
		}
	})