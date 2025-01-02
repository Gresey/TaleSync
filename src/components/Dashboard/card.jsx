import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function GradientCard({ imagesrc, title, onClick }) {
  return (
    <Card
      onClick={onClick} // Attach the onClick handler here
      sx={{
        minHeight: '280px',
        width: 320,
        borderRadius: '16px',
        boxShadow: 3,
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer', // Add cursor pointer to indicate interactivity
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardCover>
        <img
          src={imagesrc}
          alt={title}
          style={{
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end', paddingBottom: '20px' }}>
        <Typography
          level="title-lg"
          textColor="#fff"
          sx={{ fontWeight: 'bold', textAlign: 'center', fontFamily: 'Kalam, cursive' }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
