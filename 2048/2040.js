// JavaScript Document
function G2048(){
	this.addEvent();	
}
G2048.prototype = 
{
	constructor:G2048,
	init:function()
	{
		this.score = 0;//初始分数为0
		this.arr = [];//一个空数组存放16个格子中的值
		this.moveAble = false;//设置格子为不可移动
		$("#score").html("分数:0");
		$(".number_cell").remove();//用于游戏重新开始时候的初始化
		this.createArr();//生成原始数组包含两个随机格子
	},
	createArr:function()
	{
		//生成原始数组，也就是都为空数组
		var i,j;//i表示列，j表示行
		for(i=0;i<=3;i++)
		{
			this.arr[i] = [];//表示数组中的每一个值表示一个空的数组
			for(j=0;j<=3;j++)
			{
				this.arr[i][j] = {};//设置二维数组中的每一个对象为空对象，并且值为0
				this.arr[i][j].value = 0;
				
			}
		}
		//随机生成两个随机数，并且存放在数组中
		//生成随机数的思路，随机生成四个坐标，来表示两个小格子的位置
		var i1,i2,j1,j2;
		do{
			i1=getRandom(3);
			i2=getRandom(3);
			j1=getRandom(3);
			j2=getRandom(3);
		}while(i1==i2&&j1==j2);
		//将生成随机数的小格子赋值
		this.arrValueUpdate(2,i1,j1);
		this.arrValueUpdate(2,i2,j2);
		this.drawCell(i1,j1);
		this.drawCell(i2,j2);
		
	},
	arrValueUpdate:function(num,i,j)//更新数组中的值
	{
		this.arr[i][j].oldValue = this.arr[i][j].value;//将历史值保存
		this.arr[i][j].value = num;
	},
	drawCell:function(i,j)
	{//画一个新的格子
		var item = '<div class="number_cell p'+i+j+'"><div class="number_cell_con n2"><span>'+this.arr[i][j].value+'</span></div></div>';
		$(".g2048").append(item);
	},
	addEvent:function()
	{
		var that = this;
		document.onkeydown=function(Event)
		{
			var e = event || window.event || arguments.callee.caller.arguments[0];
			var direction = that.direction;
			var keyCode = e.keyCode;
			switch(keyCode)
			{
				case 39://右
				that.moveAble = false;//初始格子不可移动
				that.moveRight();
				that.checkLose();//每次移动格子之后检查是否失败
				break;
				case 40://下
				that.moveAble = false;
				that.moveDown();
				that.checkLose();
				break;
				case 37://左
				that.moveAble = false;
				that.moveLeft();
				that.checkLose();
				break;
				case 38://上
				that.moveAble = false;
				that.moveUp();
				that.checkLose();
				break;
			}
		};
	},
	newCell:function()//产生随机格子的函数
	{
		var i,j;
		var ableArr = [];//定义一个来存放空格子位置的数组
		if(this.moveAble != true)//只有当先执行了move操作和mergecell操作才可以产生随机的格子
		{
			console.log('不能增加新格子，请尝试像其他方向移动!');
			return;
		}
		for(i = 0;i<=3;i++)//循环判断其中的空格子，将所有的 空格子存入数组中,在空格子数组中随机挑选一个产生新的格子
		{
			for(j = 0;j<=3;j++)
			{
				if(this.arr[i][j].value == 0)
				{
					ableArr.push([i,j]);
				}
			}
		}
		var len = ableArr.length;
		if(len>0)
		{
			var n = getRandom(len-1);//由于数组中存在0，所以需要少取1个	
			i = ableArr[n][0];
			j = ableArr[n][1];
			this.arrValueUpdate(2,i,j);
			this.drawCell(i,j);	
		}
		else if(len == 0)
		{
			alert('格子满了');	
			return;
		}else
		{
			alert('其他问题');	
		}
		
	},
	moveLeft:function()//向左移动
	{
		var i,j,k;
		
		for(i = 0;i<=3;i++)//列
		{
			var n = 0;
			for(j = 0;j<=3;j++)//行
			{
				if(this.arr[i][j].value == 0)//此处bug，写成了=,变成了赋值语句，因此不会进行合并操作
				{
					continue;	//跳过
				}
				k = i - 1;//当前一格的左边的一格的列标
				aa:
				while(k>=n)//判断k表示的格子还在范围内
				{
					if(this.arr[k][j].value == 0)
					{
							if(k == n || (this.arr[k-1][j].value !=0 && this.arr[i][j].value != this.arr[k-1][j].value))
							{
								this.moveCell(i,j,k,j);
							}
							//此处就剩下
							k--;
					}
					else 
					{
						if(this.arr[k][j].value == this.arr[i][j].value)
						{
							this.mergeCells(i,j,k,j);
							n++;
						}
						break aa;
					}
					
				}
			}
		}
		this.newCell();
	},
	moveRight:function()//向右移动,i进行+变化
	{
		var i,j,k;
		var n=3;
		for(i = 3;i>=0;i--)//列
		{
			for(j = 0;j<=3;j++)//行
			{
				if(this.arr[i][j].value == 0)
				{
					continue;//出循环	
				}
				k = i +1;
				aa:
				while(k<=n)//右边的在范围之内
				{
					if(this.arr[k][j].value == 0)
					{
						if(k == n || (this.arr[k+1][j].value !=0 && this.arr[i][j].value != this.arr[k+1][j].value))
						{
							this.moveCell(i,j,k,j);
						}
						k++;
					}
					else
					{
						if(this.arr[k][j].value == this.arr[i][j].value)
						{
							this.mergeCells(i,j,k,j);
							n--;
						}
						break aa;	
					}
				}
			}
		}
		this.newCell();//随机格子
	},
	moveUp:function()//向上移动
	{
		var i,j,k;
		var n = 0;
		for(i = 0;i<= 3;i++)//列
		{
			for(j = 0;j<=3;j++)//行
			{
				if(this.arr[i][j].value == 0)
				{
					continue;
				}
				k = j - 1;
				
				aa:
				while(k >= n)//判断超出表示范围之外
				{
					if(this.arr[i][k].value == 0)//上一个的格子中值为0
					{
						if( k == n || (this.arr[i][k-1].value != this.arr[i][j].value && this.arr[i][k-1].value != 0))
						{
							this.moveCell(i,j,i,k);
						}
						k--;
					}
					else
					{
						if(this.arr[i][j].value == this.arr[i][k].value)
						{
							this.mergeCells(i,j,i,k);
							n++;
						}
						break aa;
					}
				}
			}
		}
		this.newCell();
		
	},
	moveDown:function()//向下移动
	{
		var i,j,k;//i表示列，j表示行，k为计算中间值
		//记录最多可以移动的位置
		for(i=0;i<=3;i++)//列
		{
			var n =3;
			for(j=3;j>=0;j--)//行s
			{
				if(this.arr[i][j].value == 0)//判断此格为0，则不需要移动
				{
					continue;//跳出循环	
				}
				k= j + 1;
				//判断当前格子的下一格有没有超出范围,如果超了范围则直接跳过 ，不移动
				aa:
				while(k<=n)
				{//进入循环继续判断
					if(this.arr[i][k].value == 0)//至少下一层的格子为0才可以移动
					{	//判断下下个格子能不能到达
						if(k == n || (this.arr[i][k+1].value != 0 && this.arr[i][j].value != this.arr[i][k+1].value))
						{//只是下移一个格子，也就是移动到【i】【k】的位置
							this.moveCell(i,j,i,k);
						}
						//到此处就剩下两种情况k+1格为0或者与j格数字相等，出循环重新检测
						k++;//在一次需要移动多个格子的时候，并不是一步一步的，而是一次性的都移动完全
					}
					else
					{
						if(this.arr[i][k].value == this.arr[i][j].value)//同列有两个相邻的格子数字相同则需要合并
						{
							this.mergeCells(i,j,i,k);
							n--;//代码优化：同一个数不能在同一次操作中做两次运动
						}
						break aa;//通过此处的形式有多种：1.移动了一格之后，但是k还是满足<=n 2.格子移动并且合并之后
					}
				}
				
			}
		}
		this.newCell();//在空位置随机生成一个格子
	},
	moveCell:function(i1,j1,i2,j2)//只是移动格子到指定位置
	{
		this.arr[i2][j2].value = this.arr[i1][j1].value;
		this.arr[i1][j1].value = 0;
		this.moveAble = true;
		$(".p"+i1+j1).removeClass("p"+i1+j1).addClass("p"+i2+j2);
	},
	checkLose:function()//检查是否都不能移动即失败
	{
		var i,j;
		for(i=0;i<=3;i++)//循环遍历其中的每一个格子
		{
			for(j = 0;j<=3;j++)
			{
				var temp = this.arr[i][j].value;//游戏可以继续的三个条件：a.存在空格子 b.相邻的正右方存在可以合并的格子 c.相邻的正下方存在可以合并的各自格子
				if(temp == 0)//如果当前为0
				{
					return false;
				}
				else if(this.arr[i+1] && (this.arr[i+1][j].value == this.arr[i][j].value))//右边的一层定义了并且当前格子的值和相邻的右边的一样
				{
					return false;
				}
				else if((this.arr[i][j+1] != undefined) && (this.arr[i][j].value == this.arr[i][j+1]).value)//下面一层的格子存在，并且和当前格子的值相等
				{
					return false;
				}
			}
		}
		alert('you lose');
		this.init();
		return true;
	},
	mergeCells:function(i1,j1,i2,j2)//移动并且合并格子
	{
		this.moveAble = true;
		var temp = this.arr[i1][j1].value;
		this.arr[i2][j2].value += this.arr[i1][j1].value;//将小格子中的值进行相加
		var temp1 = this.arr[i2][j2].value;
		this.arr[i1][j1].value = 0;
		$(".p"+i2+j2).addClass('toRemove');//先添加一个不存在的样式，在刷新数字的时候可以使用，正在进行样式更新的时候顺便刷新数字（个人理解）
		var theDom = $(".p"+i1+j1).removeClass("p"+i1+j1).addClass("p"+i2+j2).find('.number_cell_con');//移除格子pi1j1，并且添加格子pi2j2找到该格子的con属性
		setTimeout(function()//移动格子的延迟
		{
			$(".toRemove").remove();//移除这个不存在的属性
			theDom.removeClass('n'+temp).addClass('n'+temp1).find('span').html(temp1);//刷新number
			//移除con属性的初始数字颜色，添加新的数字颜色,并且找到span，将数字打印上去
		},200);
		this.score += temp1;
		$("#score").html("分数："+this.score);
		if(temp1 == 2048)//格子达到2048之后获胜，并且初始化重新开始
		{
			alert("you win!!");
			this.init();
		}
	},
	
	
	
	
	
	
	
	
	
	
	
	
}
//生成随机数的函数
function getRandom(n){
	return Math.floor(Math.random()*(n+1));//Math.random()取一个0.0到1.0的伪随机数，乘以n就是0到n的随机数	
}
//调用G2048函数
var g = new G2048();
g.init();

$("button:first").click(function(){
							g.init();	 
								})

