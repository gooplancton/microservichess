import React from 'react';
import { Button, Grid, Paper, Text } from '@mantine/core';

export function HomePage() {
  return (
    <Grid justify="center" style={{ height: '100vh' }} align="center">
      <Grid.Col span={12}>
        <Paper p="lg" shadow="md">
          <Text ta="center" size="xl" style={{ marginBottom: 20 }}>
            microservichess
          </Text>
          <Grid gutter="md" justify="center">
            <Grid.Col span={12} style={{ textAlign: 'center' }}>
              <Button size="lg" fullWidth>
                Sign In
              </Button>
            </Grid.Col>
            <Grid.Col span={12} style={{ textAlign: 'center' }}>
              <Button size="lg" fullWidth>
                Sign Up
              </Button>
            </Grid.Col>
            <Grid.Col span={12} style={{ textAlign: 'center' }}>
              <Button size="lg" fullWidth>
                Continue as Guest
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}
