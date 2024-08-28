import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Grid } from '@mui/material';
import Modal from 'react-modal';
import { backend } from 'declarations/backend';

interface Work {
  id: bigint;
  title: string;
  imageUrl: string;
  description: string | null;
}

interface ArtistInfo {
  name: string;
  bio: string;
  contactEmail: string;
}

const App: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWorks();
    fetchArtistInfo();
  }, []);

  const fetchWorks = async () => {
    try {
      const result = await backend.getWorks();
      setWorks(result);
    } catch (error) {
      console.error('Error fetching works:', error);
    }
  };

  const fetchArtistInfo = async () => {
    try {
      const result = await backend.getArtistInfo();
      setArtistInfo(result);
    } catch (error) {
      console.error('Error fetching artist info:', error);
    }
  };

  const openModal = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          {artistInfo?.name || 'VJ Artist Portfolio'}
        </Typography>

        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1">{artistInfo?.bio}</Typography>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            My Works
          </Typography>
          <Grid container spacing={3} className="gallery-grid">
            {works.map((work) => (
              <Grid item xs={12} sm={6} md={4} key={Number(work.id)} className="gallery-item">
                <img src={work.imageUrl} alt={work.title} onClick={() => openModal(work)} />
                <div className="gallery-item-overlay">
                  <Typography variant="subtitle1">{work.title}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Contact Me
          </Typography>
          <Typography variant="body1">{artistInfo?.contactEmail}</Typography>
        </Box>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Work Details"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#2A2A2A',
            border: 'none',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '80%',
            maxHeight: '80%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        {selectedWork && (
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedWork.title}
            </Typography>
            <img
              src={selectedWork.imageUrl}
              alt={selectedWork.title}
              style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
            />
            {selectedWork.description && (
              <Typography variant="body1" mt={2}>
                {selectedWork.description}
              </Typography>
            )}
            <Button onClick={closeModal} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Close
            </Button>
          </Box>
        )}
      </Modal>
    </Container>
  );
};

export default App;
