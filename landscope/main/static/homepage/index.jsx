const {
  colors,
  ThemeProvider,
  Typography,
  Container,
  makeStyles,
  createMuiTheme,
  Box,
  SvgIcon,
  Link,
  Button,
  AppBar,
  Menu,
  MenuItem,
  Hidden,
  Card,
  CardHeader,
  CardContent,
  Toolbar,
  TextField,
  Icon,
  Autocomplete,
  Input,
  Paper,
  Grid,
  InputLabel,
  IconButton,
  InputAdornment,
  MenuIcon,
  Divider

} = MaterialUI;
const {
  useState
} = React;
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
    // margin: theme.spacing(6, 0, 3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  container: {
    
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));
const floatRight = {"marginLeft":"auto"};
function ButtonAppBar(props) {
  const classes = useStyles();
  const [anchorEl,setAnchor] = useState(null);
  const items = props.items;
  function handleClose() {
    setAnchor(null);
  }

  function handleClick(e) {
    setAnchor(e.target);
  }
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6">
          Landscope
        </Typography>
        <Hidden smDown>
          {items.map((e,i)=>
            <Button key={e} style= {i==0?floatRight:null} color="inherit">{e}</Button>
          )}
        </Hidden>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl = {null}
            anchorOrigin={{vertical:'bottom',horizontal:'right'}}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
          {items.map((e,i)=><MenuItem key={e} onClick={handleClose}>{e}</MenuItem>)}
        </Menu>
        <Hidden mdUp>
        <IconButton style={floatRight} edge="end" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <Icon>more_vert</Icon>
        </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
function Carousel(props){
  return (
    <div style={{ background:"grey", position: "relative",zIndex:"-1", top:"56px",marginTop: 0,width: "100%",height:"50%",maxHeight:"300px"}}>
    {props.images.map(e=><img src={e}/>)}
    </div>
    );
}
function QuickStart(){
  var cardStyles = {maxWidth:"300px",margin:"auto"}
  var locations = [{title:"Lagos"},{title:"Ibadan"}]
  var themePadding = {float:"right",margin:theme.spacing(1)}
  return (
    <Card style = {cardStyles} >
      <CardHeader title="Search"/>
      <CardContent style={{paddingTop:0}}>
        <TextField
        label="Enter State eg Lagos, Delta, Edo"
        id="free-solo-demo"
        type="search" 
        InputProps = {{
          startAdornment: <InputAdornment><Icon>place</Icon></InputAdornment>
        }}
        ></TextField>
        <TextField
        label="Enter Area"
        id="free-solo-demo"
        type="search" 
        InputProps = {{
          startAdornment: <InputAdornment><Icon>place</Icon></InputAdornment>
        }}
        ></TextField>
        <Button startIcon={<Icon>search</Icon>} variant="contained" color="primary" style={themePadding} type="submit">
          Find Properties
        </Button>
      </CardContent>
    </Card>
    );
}
function BlogItem(props){
  return (<Grid key={props.id} item xs={12} md={6} lg={4} style={{padding:theme.spacing(3)}}>
    <Typography variant="h6">{props.title}</Typography>
    <Divider/>
    {props.content}
  </Grid>);
}
function Blog(){
  var [detail,setDetail] = useState(4);
  var [items,updateList] = useState([
    {id:"0","title":"Hello there","content":"Smaple content"},
    {id:"1","title":"Hello there","content":"Smaple content"},
    {id:"2","title":"Hello there","content":"Smaple content"},
    {id:"3","title":"Hello there","content":"Smaple content"},
    {id:"4","title":"Hello there","content":"Smaple content"},
    {id:"5","title":"Hello there","content":"Smaple content"},
    {id:"6","title":"Hello there","content":"Smaple content"},
    {id:"7","title":"Hello there","content":"Smaple content"}
    ]);
  var moreItems = false;
  if(items.length>detail){
    items = items.slice(0,detail);
    moreItems = true;
  }
  function more(){
    setDetail(detail+4);
  }
  return (<Grid container>
    {items.map(BlogItem)}
    {moreItems?<Button lg={12} onClick={more} style={{margin:"auto"}} variant="outlined">More Posts...</Button>:null}
    </Grid>);
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {blogPosts:[],images:[]}
  }
  requestBlogPosts(){
    if(window.blogPosts){
      this.setState({blogPosts:window.blogPosts});
    }
    else{
      return;
    }
  }
  requestImages(){
    if(window.featureImages){
      this.setState({images:window.featureImages});
    }
    else{
      return;
    }
  }
  componentDidMount(){
    this.requestBlogPosts();
    this.requestImages();
  }
  render(){
    return (
      <Container style={{padding:0}} maxWidth="lg">
        <ButtonAppBar items={["Home","About","Login","Signup"]}/>
        <Carousel images = {this.state.images} />
        <QuickStart/>
        <div style={{padding:"14px"}}>
        <Typography style={{marginLeft:"20px"}} variant="h5">Blog</Typography>
        <Blog/>
        </div>
      </Container>
        );
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);