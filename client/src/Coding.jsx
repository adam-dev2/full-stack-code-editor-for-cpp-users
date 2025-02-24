import React, { useState, useEffect } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemText, Button, AppBar, Toolbar, TextField } from '@mui/material';
import MonacoEditor from '@monaco-editor/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Navbar from './Navbar';
import { io } from 'socket.io-client';

const socket = io('http://localhost:2000');

const Coding = () => {
  const [activeTab, setActiveTab] = useState('Code');
  const [output, setOutput] = useState('');
  const [code, setCode] = useState("#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    cout<<\"Hello World\";\n}");
  const [inputNeeded, setInputNeeded] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the backend');
    });

    socket.on('input', () => {
      setInputNeeded(true);
      setOutput("Input required. Please enter your input:");
      setActiveTab('Output');
    });

    socket.on('output', (data) => {
      setOutput(data.output);
      setInputNeeded(false);
    });

    return () => {
      socket.off('input');
      socket.off('output');
    };
  }, []);

  const runCode = () => {
    setOutput("Running code...");
    setActiveTab('Output');
    socket.emit('code', JSON.stringify({ code }));
  };

  const submitInput = () => {
    socket.emit('takeinput', input);
    setInput('');
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  }

  const download = () => {
    const blob = new Blob([code, output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'code.cpp';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'rgba(16,27,35,255)', height: '100vh', width: '100vw' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 150,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 150, boxSizing: 'border-box', bgcolor: 'rgba(16,27,35,255)', color: 'white', borderRight: 1, borderColor: 'black' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => handleTabChange('Code')} sx={{ ":hover": { boxShadow: 10, bgcolor: 'grey', cursor: 'pointer' } }}>
            <ListItemText primary="Code" />
          </ListItem>
          <ListItem button onClick={() => handleTabChange('Output')} sx={{ ":hover": { boxShadow: 10, bgcolor: 'grey', cursor: 'pointer' } }}>
            <ListItemText primary="Output" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'rgba(16,27,35,255)', width: '10vw' }}>
        <Toolbar />
        <Typography variant="h4" fontFamily="monospace" color='white'>
          {activeTab === 'Code' ? 'CODE HERE' : 'OUTPUT'}
        </Typography>
        {activeTab === 'Code' && (
          <Box>
            <Button color="inherit" onClick={runCode} disableRipple sx={{ p: 0, m: 2, marginLeft: 0 }}>
              <PlayArrowIcon sx={{ m: 0, fontSize: 70, color: 'white' }} />
            </Button>
            <Button color="inherit" onClick={download} disableRipple sx={{ p: 0, m: 2, marginLeft: 0 }}>
              <SaveAltIcon sx={{ m: 0, fontSize: 60, color: 'white' }} />
            </Button>
            <Box sx={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', width: '100%', p: 0, m: 0 }}>
              <MonacoEditor
                height="70vh"
                width="80vw"
                value={code}
                language="java"
                theme="vs-dark"
                onChange={(value) => setCode(value)}
                options={{
                  selectOnLineNumbers: true,
                  minimap: { enabled: true },
                  lineNumbers: 'on',
                  bracketPairColorization: true,
                  fontSize: 14,
                  wordWrap: 'on',
                  autoClosingBrackets: 'always',
                  folding: true,
                  showUnused: true,
                  renderWhitespace: 'boundary',
                  suggestOnTriggerCharacters: true,
                  tabSize: 4,
                }}
              />
            </Box>
          </Box>
        )}
        {activeTab === 'Output' && (
          <Box sx={{ width: '100%', height: '70vh', bgcolor: 'black', p: 3, m: 5, marginLeft: 0 }}>
            <Typography variant="body1" color="white" fontFamily="monospace">
              {output}
            </Typography>
            {inputNeeded && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TextField
                  label="Enter Input"
                  variant="outlined"
                  color="secondary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  sx={{ bgcolor: 'white', borderRadius: 1 }}
                />
                <Button onClick={submitInput} sx={{ ml: 2, color: 'white' }}>
                  Submit
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Coding;
