import { Stack } from 'expo-router';
import React, { Component, useEffect } from 'react';





const WorkspaceLayout = () => {
    return (
              <Stack>
                <Stack.Screen name="create" options={{headerShown:false}} />
              </Stack>
    );
};


export default WorkspaceLayout;
