import './App.css';
import React, {useState} from "react";
import {
  Typography,
  Grid,
  Paper,
  Button
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-terminal";

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const columns = [
  { 
    field: 'id',
    headerName: 'ID',
    width: 90 
  },
  { 
    field: 'linea',
    headerName: 'Linea',
    width: 120 
  },
  {
    field: 'token',
    headerName: 'Token',
    width: 150,
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 150,
  },
  { 
    field: 'colno',
    headerName: 'Columna',
    width: 120 
  }
];

/*const rows = [
  { id: 1,linea: 1, token: 'Snow', tipo: "NULL"},
  { id: 2,linea: 2, token: 'Snow A', tipo: "A"},
  { id: 3,linea: 3, token: 'Snow C', tipo: "B"},
  { id: 4,linea: 4, token: 'Snow D', tipo: "C"}
]*/

const StyledPaper = withStyles((theme) => ({
  root: {
    minHeight: '100%',
    backgroundColor: theme.palette.background.default,
  },
}))(Paper);


function App() {
  const [rows, setRows] = useState([]);
  const [lexOutput, setLexOutput] = useState('');
  const [syntaxOutput, setSyntaxOutput] = useState('');
  const [loadingRows, setLoadingRows] = useState(false);
  const [code, setCode] = useState("");
  

  const evaluate = (code) => {
    setLoadingRows(true);
    fetch("http://127.0.0.1:8000/api/analyzer/", {
      method: 'POST',
      body: JSON.stringify({code})
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data)
      setRows(data.tokens);
      setLexOutput(data.lex_output);
      setSyntaxOutput(data.syntax_output);
    }).finally(()=>{
      setLoadingRows(false);
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledPaper elevation={0} square>
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography className="app-title" variant="h2" >
              {"Dart-vCR7"}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <Paper style={{margin: '20px', padding:"20px"}}
                >
              <Typography className="app-subtitle" variant="h6" >
                {"Escriba código en Dart-vCR7"}
              </Typography>
              <AceEditor
                style={{width: "100%", marginTop: '10px'}}
                mode="java"
                theme="terminal"
                fontSize={17}
                onChange={(value)=>{
                  setCode(value);
                }}
                onSelectionChange(selection) {
                  const content = this.refs.aceEditor.editor.session.getTextRange(selection.getRange());
                  // use content
                }
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  tabSize: 2
              }}
              />
              <Button 
                style={{marginTop: '10px'}}
                variant="contained"
                onClick={()=> {evaluate(code);}}>
                {'Evaluar'}
              </Button>
            </Paper>
        </Grid>
        <Grid container item xs={12} md={6} >
            <Grid item xs={12}>
            <Paper style={{margin: '20px', padding:"20px"}} >
            <Typography className="app-subtitle" variant="h6" >
              {"Análisis"}
            </Typography>
            <div style={{ height: 350, width: '100%', marginTop: '10px'}}>
              <DataGrid
                density={"compact"}
                loading={loadingRows}
                rows={rows}
                columns={columns}
                //pageSize={5}
                editMode={false}
                isCellEditable={()=>false}
                isRowSelectable={()=>false}
              />
            </div>
            </Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper style={{margin: '20px', padding:"20px"}} >
              <Typography className="app-subtitle" variant="h6" >
                {"Logs"}
              </Typography>
              <Typography className="app-subtitle" variant="subtitle2" >
                {"Lexical logs: "}
              </Typography>
              <Typography className="app-subtitle" variant="body2" style={{color:'orange'}} >
                {lexOutput}
              </Typography>
              <Typography className="app-subtitle" variant="subtitle2" >
                {"Syntax logs: "}
              </Typography>
              <Typography className="app-subtitle" variant="body2" style={{color:'orange'}} >
                {syntaxOutput}
              </Typography>
            </Paper>
            </Grid>
        </Grid>
      </Grid>
    </div>
    </StyledPaper>
    </ThemeProvider>
  );
}

export default App;
