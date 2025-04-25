import React from "react";
import { Box, Card, Typography, Grid, Chip } from "@mui/material";

const statusColors = {
  Homologado: "success",
  Pendente: "warning",
  Bloqueado: "error",
};

const KpiCards = ({ kpis }: { kpis: any }) => (
  <Grid container spacing={2} justifyContent="flex-end">
    {kpis.map((kpi: any) => (
      <Grid item key={kpi.title}>
        <Card sx={{ minWidth: 200, p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">{kpi.title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {kpi.value}
            <Typography component="span" variant="body2" color={kpi.variation >= 0 ? "success.main" : "error.main"} sx={{ ml: 1 }}>
              {kpi.variation >= 0 ? "+" : ""}
              {kpi.variation}%
            </Typography>
          </Typography>
          <Box display="flex" gap={1} mt={1}>
            {Object.entries(kpi.statusPercents).map(([status, percent]: any) => (
              <Chip
                key={status}
                label={`${status} ${percent}%`}
                color={statusColors[status as keyof typeof statusColors]}
                size="small"
                sx={{ fontWeight: 700 }}
              />
            ))}
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default KpiCards;
