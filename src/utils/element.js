import vue from 'vue'
import { 
    Dropdown,DropdownMenu,DropdownItem,Image,Input,Button,Form,FormItem,DatePicker,Col,Card,Table,TableColumn,Tag,Popover,Pagination,Dialog,
    Select,Option,Upload,Avatar,Collapse,CollapseItem,Progress,Step,Steps,Checkbox, Message,MessageBox,TabPane,Tabs,Notification,Rate,Loading
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/fonts/style.css';
vue.use(Dropdown)
vue.use(DropdownItem)
vue.use(DropdownMenu)
vue.use(Image)
vue.use(Input)
vue.use(Button)
vue.use(Form)
vue.use(FormItem)
vue.use(DatePicker)
vue.use(Col)
vue.use(Card)
vue.use(Table)
vue.use(TableColumn)
vue.use(Tag)
vue.use(Popover)
vue.use(Pagination)
vue.use(Dialog)
vue.use(Select)
vue.use(Option)
vue.use(Upload)
vue.use(Avatar)
vue.use(Collapse)
vue.use(CollapseItem)
vue.use(Progress)
vue.use(Step)
vue.use(Steps)
vue.use(Checkbox)
vue.use(Image)
vue.use(TabPane)
vue.use(Tabs)
vue.use(Rate)
vue.use(Loading)
vue.component(Notification)
vue.prototype.$message = Message;
vue.prototype.$confirm = MessageBox.confirm;
vue.prototype.$notify=Notification
vue.prototype.$prompt=MessageBox.prompt;
