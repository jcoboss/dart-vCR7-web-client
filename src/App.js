import './App.css';
import {
  Typography,
  Grid,
  Paper,
  TextareaAutosize,
  Button
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, withStyles } from '@material-ui/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const StyledPaper = withStyles((theme) => ({
  root: {
    minHeight: '100%',
    backgroundColor: theme.palette.background.default,
  },
}))(Paper);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <StyledPaper elevation={0} square>
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography className="app-title" variant="h2" >
              {"Dart-vCR7"}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Paper style={{margin: '20px', padding:"20px"}}
                >
              <Typography className="app-subtitle" variant="h6" >
                {"Escriba código en Dart-vCR7"}
              </Typography>
              <TextareaAutosize
                style={{ width: "100%", backgroundColor: 'black', color: 'white', resize:'none', marginRight: "20px"}}
                rows={25}
                rowsMax={25}
                aria-label="maximum height"
                placeholder="Write code"
              />
              <Button variant="primary">
                {'Evaluar'}
              </Button>
            </Paper>
        </Grid>
        <Grid item xs={6}>
        <div style={{ height: 400, width: '100%', margin: '20px' }}>
          <Typography className="app-subtitle" variant="h6" >
            {"Análisis"}
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            editMode={false}
            isCellEditable={()=>false}
            isRowSelectable={()=>false}
          />
        </div>
        </Grid>
      </Grid>
    </div>
    </StyledPaper>
    </ThemeProvider>
  );
}

export default App;
