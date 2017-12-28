// JavaScript Document
function G2048(){
	this.addEvent();	
}
G2048.prototype = 
{
	constructor:G2048,
	init:function()
	{
		this.score = 0;//��ʼ����Ϊ0
		this.arr = [];//һ����������16�������е�ֵ
		this.moveAble = false;//���ø���Ϊ�����ƶ�
		$("#score").html("����:0");
		$(".number_cell").remove();//������Ϸ���¿�ʼʱ��ĳ�ʼ��
		this.createArr();//����ԭʼ������������������
	},
	createArr:function()
	{
		//����ԭʼ���飬Ҳ���Ƕ�Ϊ������
		var i,j;//i��ʾ�У�j��ʾ��
		for(i=0;i<=3;i++)
		{
			this.arr[i] = [];//��ʾ�����е�ÿһ��ֵ��ʾһ���յ�����
			for(j=0;j<=3;j++)
			{
				this.arr[i][j] = {};//���ö�ά�����е�ÿһ������Ϊ�ն��󣬲���ֵΪ0
				this.arr[i][j].value = 0;
				
			}
		}
		//���������������������Ҵ����������
		//�����������˼·����������ĸ����꣬����ʾ����С���ӵ�λ��
		var i1,i2,j1,j2;
		do{
			i1=getRandom(3);
			i2=getRandom(3);
			j1=getRandom(3);
			j2=getRandom(3);
		}while(i1==i2&&j1==j2);
		//�������������С���Ӹ�ֵ
		this.arrValueUpdate(2,i1,j1);
		this.arrValueUpdate(2,i2,j2);
		this.drawCell(i1,j1);
		this.drawCell(i2,j2);
		
	},
	arrValueUpdate:function(num,i,j)//���������е�ֵ
	{
		this.arr[i][j].oldValue = this.arr[i][j].value;//����ʷֵ����
		this.arr[i][j].value = num;
	},
	drawCell:function(i,j)
	{//��һ���µĸ���
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
				case 39://��
				that.moveAble = false;//��ʼ���Ӳ����ƶ�
				that.moveRight();
				that.checkLose();//ÿ���ƶ�����֮�����Ƿ�ʧ��
				break;
				case 40://��
				that.moveAble = false;
				that.moveDown();
				that.checkLose();
				break;
				case 37://��
				that.moveAble = false;
				that.moveLeft();
				that.checkLose();
				break;
				case 38://��
				that.moveAble = false;
				that.moveUp();
				that.checkLose();
				break;
			}
		};
	},
	newCell:function()//����������ӵĺ���
	{
		var i,j;
		var ableArr = [];//����һ������ſո���λ�õ�����
		if(this.moveAble != true)//ֻ�е���ִ����move������mergecell�����ſ��Բ�������ĸ���
		{
			console.log('���������¸��ӣ��볢�������������ƶ�!');
			return;
		}
		for(i = 0;i<=3;i++)//ѭ���ж����еĿո��ӣ������е� �ո��Ӵ���������,�ڿո��������������ѡһ�������µĸ���
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
			var n = getRandom(len-1);//���������д���0��������Ҫ��ȡ1��	
			i = ableArr[n][0];
			j = ableArr[n][1];
			this.arrValueUpdate(2,i,j);
			this.drawCell(i,j);	
		}
		else if(len == 0)
		{
			alert('��������');	
			return;
		}else
		{
			alert('��������');	
		}
		
	},
	moveLeft:function()//�����ƶ�
	{
		var i,j,k;
		
		for(i = 0;i<=3;i++)//��
		{
			var n = 0;
			for(j = 0;j<=3;j++)//��
			{
				if(this.arr[i][j].value == 0)//�˴�bug��д����=,����˸�ֵ��䣬��˲�����кϲ�����
				{
					continue;	//����
				}
				k = i - 1;//��ǰһ�����ߵ�һ����б�
				aa:
				while(k>=n)//�ж�k��ʾ�ĸ��ӻ��ڷ�Χ��
				{
					if(this.arr[k][j].value == 0)
					{
							if(k == n || (this.arr[k-1][j].value !=0 && this.arr[i][j].value != this.arr[k-1][j].value))
							{
								this.moveCell(i,j,k,j);
							}
							//�˴���ʣ��
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
	moveRight:function()//�����ƶ�,i����+�仯
	{
		var i,j,k;
		var n=3;
		for(i = 3;i>=0;i--)//��
		{
			for(j = 0;j<=3;j++)//��
			{
				if(this.arr[i][j].value == 0)
				{
					continue;//��ѭ��	
				}
				k = i +1;
				aa:
				while(k<=n)//�ұߵ��ڷ�Χ֮��
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
		this.newCell();//�������
	},
	moveUp:function()//�����ƶ�
	{
		var i,j,k;
		var n = 0;
		for(i = 0;i<= 3;i++)//��
		{
			for(j = 0;j<=3;j++)//��
			{
				if(this.arr[i][j].value == 0)
				{
					continue;
				}
				k = j - 1;
				
				aa:
				while(k >= n)//�жϳ�����ʾ��Χ֮��
				{
					if(this.arr[i][k].value == 0)//��һ���ĸ�����ֵΪ0
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
	moveDown:function()//�����ƶ�
	{
		var i,j,k;//i��ʾ�У�j��ʾ�У�kΪ�����м�ֵ
		//��¼�������ƶ���λ��
		for(i=0;i<=3;i++)//��
		{
			var n =3;
			for(j=3;j>=0;j--)//��s
			{
				if(this.arr[i][j].value == 0)//�жϴ˸�Ϊ0������Ҫ�ƶ�
				{
					continue;//����ѭ��	
				}
				k= j + 1;
				//�жϵ�ǰ���ӵ���һ����û�г�����Χ,������˷�Χ��ֱ������ �����ƶ�
				aa:
				while(k<=n)
				{//����ѭ�������ж�
					if(this.arr[i][k].value == 0)//������һ��ĸ���Ϊ0�ſ����ƶ�
					{	//�ж����¸������ܲ��ܵ���
						if(k == n || (this.arr[i][k+1].value != 0 && this.arr[i][j].value != this.arr[i][k+1].value))
						{//ֻ������һ�����ӣ�Ҳ�����ƶ�����i����k����λ��
							this.moveCell(i,j,i,k);
						}
						//���˴���ʣ���������k+1��Ϊ0������j��������ȣ���ѭ�����¼��
						k++;//��һ����Ҫ�ƶ�������ӵ�ʱ�򣬲�����һ��һ���ģ�����һ���ԵĶ��ƶ���ȫ
					}
					else
					{
						if(this.arr[i][k].value == this.arr[i][j].value)//ͬ�����������ڵĸ���������ͬ����Ҫ�ϲ�
						{
							this.mergeCells(i,j,i,k);
							n--;//�����Ż���ͬһ����������ͬһ�β������������˶�
						}
						break aa;//ͨ���˴�����ʽ�ж��֣�1.�ƶ���һ��֮�󣬵���k��������<=n 2.�����ƶ����Һϲ�֮��
					}
				}
				
			}
		}
		this.newCell();//�ڿ�λ���������һ������
	},
	moveCell:function(i1,j1,i2,j2)//ֻ���ƶ����ӵ�ָ��λ��
	{
		this.arr[i2][j2].value = this.arr[i1][j1].value;
		this.arr[i1][j1].value = 0;
		this.moveAble = true;
		$(".p"+i1+j1).removeClass("p"+i1+j1).addClass("p"+i2+j2);
	},
	checkLose:function()//����Ƿ񶼲����ƶ���ʧ��
	{
		var i,j;
		for(i=0;i<=3;i++)//ѭ���������е�ÿһ������
		{
			for(j = 0;j<=3;j++)
			{
				var temp = this.arr[i][j].value;//��Ϸ���Լ���������������a.���ڿո��� b.���ڵ����ҷ����ڿ��Ժϲ��ĸ��� c.���ڵ����·����ڿ��Ժϲ��ĸ��Ը���
				if(temp == 0)//�����ǰΪ0
				{
					return false;
				}
				else if(this.arr[i+1] && (this.arr[i+1][j].value == this.arr[i][j].value))//�ұߵ�һ�㶨���˲��ҵ�ǰ���ӵ�ֵ�����ڵ��ұߵ�һ��
				{
					return false;
				}
				else if((this.arr[i][j+1] != undefined) && (this.arr[i][j].value == this.arr[i][j+1]).value)//����һ��ĸ��Ӵ��ڣ����Һ͵�ǰ���ӵ�ֵ���
				{
					return false;
				}
			}
		}
		alert('you lose');
		this.init();
		return true;
	},
	mergeCells:function(i1,j1,i2,j2)//�ƶ����Һϲ�����
	{
		this.moveAble = true;
		var temp = this.arr[i1][j1].value;
		this.arr[i2][j2].value += this.arr[i1][j1].value;//��С�����е�ֵ�������
		var temp1 = this.arr[i2][j2].value;
		this.arr[i1][j1].value = 0;
		$(".p"+i2+j2).addClass('toRemove');//�����һ�������ڵ���ʽ����ˢ�����ֵ�ʱ�����ʹ�ã����ڽ�����ʽ���µ�ʱ��˳��ˢ�����֣�������⣩
		var theDom = $(".p"+i1+j1).removeClass("p"+i1+j1).addClass("p"+i2+j2).find('.number_cell_con');//�Ƴ�����pi1j1��������Ӹ���pi2j2�ҵ��ø��ӵ�con����
		setTimeout(function()//�ƶ����ӵ��ӳ�
		{
			$(".toRemove").remove();//�Ƴ���������ڵ�����
			theDom.removeClass('n'+temp).addClass('n'+temp1).find('span').html(temp1);//ˢ��number
			//�Ƴ�con���Եĳ�ʼ������ɫ������µ�������ɫ,�����ҵ�span�������ִ�ӡ��ȥ
		},200);
		this.score += temp1;
		$("#score").html("������"+this.score);
		if(temp1 == 2048)//���Ӵﵽ2048֮���ʤ�����ҳ�ʼ�����¿�ʼ
		{
			alert("you win!!");
			this.init();
		}
	},
	
	
	
	
	
	
	
	
	
	
	
	
}
//����������ĺ���
function getRandom(n){
	return Math.floor(Math.random()*(n+1));//Math.random()ȡһ��0.0��1.0��α�����������n����0��n�������	
}
//����G2048����
var g = new G2048();
g.init();

$("button:first").click(function(){
							g.init();	 
								})

