import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const features = [
  { title: 'Learn C++', img: 'src/components/images/🦉Night Owl🦉.jpg' },
  { title: 'Practice coding', img: 'src/components/images/Banner design.jpg' },
  { title: 'Run C++ code', img: 'src/components/images/Get more from KOD Dev on Patreon.jpg' },
  { title: 'Debug programs', img: 'src/components/images/Free Vector _ Laptop with program code isometric icon, software development and programming applications dark neon.jpg' },
  { title: 'Write algorithms', img: 'src/components/images/Illustration for cryptocurrency.jpg' },
  { title: 'Build C++ projects', img: 'src/components/images/I love coding.jpg' },
];

const FeatureSection = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        What can I do with Code Runner?
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Code Runner is an online compiler that lets you write, run, and save your C++ code.
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <img src={feature.img} alt={feature.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
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
