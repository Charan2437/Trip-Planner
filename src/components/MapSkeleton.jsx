import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';

export default function ImageSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
      <Box sx={{ m: 'auto' }}>
        <AspectRatio variant="plain" sx={{ width: 900 , height : 900 }}>
          <Skeleton loading={loading}>
            <img
              src='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
              alt=""
            />
          </Skeleton>
        </AspectRatio>
      </Box>
   
    </Stack>
  );
}