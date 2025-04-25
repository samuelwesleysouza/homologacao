import { ComponentsOverrides, Theme } from '@mui/material/styles';

// Augment the MUI theme to support MuiDataGrid overrides
declare module '@mui/material/styles' {
  interface ComponentsOverrides {
    MuiDataGrid?: ComponentsOverrides<Theme>['MuiDataGrid'];
  }
  interface ComponentsPropsList {
    MuiDataGrid?: any;
  }
  interface Components {
    MuiDataGrid?: any;
  }
}
