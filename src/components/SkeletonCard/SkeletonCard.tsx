import { Box, Card, CardContent, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const SkeletonCard = () => {
  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <Card
        sx={{
          m: 2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
        }}
      >
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <Skeleton sx={{ height: 300, width: 200, borderRadius: 2 }} animation="wave" variant="rectangular" />
        </Box>

        <CardContent sx={{ p: 1, paddingBottom: 0, display: 'flex', flexDirection: 'column' }}>
          <Skeleton animation="wave" height={32} />
          <Skeleton sx={{ mt: 'auto' }} animation="wave" height={20} width={36} />
        </CardContent>
      </Card>
    </Grid>
  );
};
