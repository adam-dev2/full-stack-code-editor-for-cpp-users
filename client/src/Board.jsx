import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const features = [
  { title: 'Learn C++', img: 'src/components/images/1.jpg' },
  { title: 'Practice coding', img: 'src/components/images/2.jpg' },
  { title: 'Run C++ code', img: 'src/components/images/3.jpg' },
  { title: 'Debug programs', img: 'src/components/images/4.jpg' },
  { title: 'Write algorithms', img: 'src/components/images/5.jpg' },
  { title: 'Build C++ projects', img: 'src/components/images/6.jpg' },
];

const FeatureSection = () => {
  return (
    <Box sx={{ alignContent: 'center', padding: 20, paddingTop: 5 }}>
      <Typography variant="h4" align="center" color='white' gutterBottom>
        What can I do with Code Runner?
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4, color: 'white'}}>
        Code Runner is an online compiler that lets you write, run, and save your C++ code.
      </Typography>
      <Grid container>
        {features.map((feature, index) => (
          <Grid item xs={8} sm={4} md={3} key={index}>
            <Card elevation={0}>
              <CardContent sx={{ textAlign: 'start',backgroundColor: 'rgba(16,27,35,255)'  }}>
                <img src={feature.img} alt={feature.title} style={{ width: '100%', height:'auto', borderRadius: '20px'}} />
                <Typography variant="h6" sx={{ mt: 2 , color:'white'}}>
                  {feature.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureSection;
