(function($){
	'use strict';

	var ModuleName='MealOrder';

	var Module = function(element,opts){
		this.ele = element;
		this.$ele = $(element);
		this.opts = opts;
		this.$btn = '<button type="submit" class="btn btn-primary submitBtn">Submit</button>';
		this.checkStatus = 0;
		this.$checkBox = this.$ele.find('.goCheck');
		this.$select = this.$ele.find('select');
		this.$submit = this.$ele.find('.submitBtn');
		this.selectArray = [];
		this.$loginInput = this.$ele.next('.login').find('input[name="id"]');
		this.$loginInput2 = this.$ele.next('.login').find('input[name="pw"]');
	}

	Module.Default = {
		Meal: 1, //0=早班 , 1=午餐
		FinishTime: '11:00',
		st:[{k:99 ,name: "&#x274C;尚未出爐",price: 0}],
		nd:[{k:99 ,name: "&#x274C;尚未出爐",price: 0}],
		rd:[{k:99 ,name: "&#x274C;尚未出爐",price: 0}]
	}
//初始化並註冊事件
	Module.prototype.init = function(){
		var self=this;
        this.SetSelectList();
        this.$checkBox.on('click',function(){
        	self.Check();
        })
        this.$submit.on('click',function(){
        	self.Submit();
        })
        this.$loginInput.on('keyup',function(){
        	self.verification();
        })
        this.$loginInput2.on('keyup',function(){
        	self.verification();
        })
	}
//接收對象、並且組成html
	Module.prototype.MakeString = function(obj,option,n){
		var option = '';
		var nb = '&nbsp&nbsp&nbsp&nbsp';
        obj.map
    		(
                (item) => {
                    option += '<option value="'+item.k+'">'+item.name+nb+item.price+'$</option>';
            	}
            );
        $('#inlineFormCustomSelect'+n).html(option);
	}
//設定select>option
	Module.prototype.SetSelectList = function(){
		this.MakeString(this.opts.st, 'option1','0');
  		this.MakeString(this.opts.nd, 'option2','1');
  		this.MakeString(this.opts.rd, 'option3','2');
	}
//取得selected裡面的值 塞進陣列裡面
	Module.prototype.GetSeletcedValue = function(){
		var selectarr = [];
		this.$ele.find('select').each(function(){
			selectarr.push(this.value);
		})
		this.selectArray = selectarr;
	}
	Module.prototype.Check = function(){
		if(this.checkStatus===0){
			this.checkStatus=1;
			this.$select.prop('disabled',"true");
			this.$submit.removeAttr('disabled');
		}else{
			this.checkStatus=0;
			this.$select.removeAttr('disabled');
			this.$submit.prop('disabled',"true");
		}
		this.GetSeletcedValue();
	}
//送出鈕取出陣列的資料
	Module.prototype.Submit = function(){
		var st = this.opts.st;
		var nd = this.opts.nd;
		var rd = this.opts.rd;
		var YourOrder ='<p>Your order :</p>';
		var FirstMeal = '<p>'+st[this.selectArray[0]].name+'</p>';
		var SecendMeal ='<p>'+nd[this.selectArray[1]].name+'</p>';
		var TherdMeal = '<p>'+rd[this.selectArray[2]].name+'</p>';
		var ListEnd = '<button type="submit" class="btn btn-primary submitBtnOrder" disabled="disabled">請先登入</button>'
		var OrderList = YourOrder+FirstMeal+SecendMeal+TherdMeal+ListEnd;
		if(this.checkStatus===1){
			$('.login').show();
			$('.showMeal').append(OrderList);
		}
		this.$submit.prop('disabled',"true");
		this.$checkBox.prop('disabled',"true");
		this.$ele.append('<div class="login"><form><label class="mr-sm-2" for="id">ID</label><input type="text" name="id"><label class="mr-sm-2" for="id">Password</label><input type="password" name="pw"></form><div class="showMeal"></div></div>')
	}
//驗證登入的帳號密碼
	Module.prototype.verification = function(){
		var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var $loginInput = this.$loginInput;
		var $loginInput2 =this.$loginInput2;
		if($loginInput.val().length >= 8 && $loginInput2.val().length >=4){
			$('.submitBtnOrder').removeAttr('disabled').text('送出');
		}else{
			$('.submitBtnOrder').prop('disabled',"true").text('請先登入');
		}
	}

	$.fn[ModuleName] = function( methods, opts ){
		return this.each(function(){
			var $this = $(this);
            let module = $this.data( ModuleName );
            var opts = null;
			if(!!module){
				console.log('Oops!!! Something go wrong');
			}else{
				opts = $.extend( {}, Module.Default, (typeof methods === 'object' && methods ), ( typeof options === 'object' && opts ) );
                module = new Module(this, opts);
                $this.data( ModuleName, module );
                //初始化並註冊事件
                module.init();
			}
		})
	}
})(jQuery);
//將以下解除被備註，並且放置於html>script裡
// $('.form-inline').MealOrder({
// 	Meal: 1, //0=早班 , 1=午餐
// 	FinishTime: '11:00',
// 	st:[
// 		{k:0 , name:"&#x1F414;香酥雞腿",price:45},
// 		{k:1 , name:"&#x1F437;酥炸排骨",price:40},
// 		{k:2 , name:"&#x1F41F;清蒸鮮魚",price:50},
// 		{k:3 , name:"&#x1F41F;巴沙魚",price:50}
// 		],
// 	nd:[
// 		{k:0 ,name: "&#x1F344;香菇", price: 20},
// 		{k:1 ,name: "&#x1F33D;空心菜",price: 20},
// 		{k:2 ,name: "&#x1F33E;青江菜",price: 20},
// 		{k:3 ,name: "&#x1F33F;大白菜",price: 25},
// 		{k:4 ,name: "&#x1F346;茄子", price: 25}
// 		],
// 	rd:[
// 		{k:0 ,name: "&#x1F372;蘑菇濃湯",price: 25},
// 		{k:1 ,name: "&#x1F372;青菜蛋花湯",price: 20},
// 		{k:2 ,name: "&#x1F379;冬瓜茶",price: 15},
// 		{k:3 ,name: "&#x1F373;水蜜桃茶飲",price: 30},
// 		]
// })