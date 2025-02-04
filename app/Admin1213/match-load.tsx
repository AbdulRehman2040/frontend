import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ========= TypeScript Interfaces ========= */
interface Seller {
  _id: string;
  landlordName: string;
  landlordPhoneNumber: string;
  landlordEmailAddress: string;
  propertyCategory: string;
  landlordPropertyType: string;
  landlordPropertyAddress: string;
  // Additional fields may be present
  [key: string]: any;
}

interface Buyer {
  _id: string;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  propertyCategory: string;
  propertyTypeSelect: string;
  areaRequired: string;
  // Additional fields may be present
  [key: string]: any;
}

interface Match {
  seller: Seller;
  buyer: Buyer;
}

/* ========= Mapping Objects ========= */
const sellerMapping: Record<string, string> = {
  landlordName: 'Name',
  landlordPhoneNumber: 'Phone',
  landlordEmailAddress: 'Email',
  landlordPropertyAddress: 'Address',
  landlordPropertyType: 'Property Type',
  propertyCategory: 'Category',
  landlordRent: 'Rent'
};

const buyerMapping: Record<string, string> = {
  name: 'Name',
  phoneNumber: 'Phone',
  emailAddress: 'Email',
  areaRequired: 'Address',
  propertyTypeSelect: 'Property Type',
  propertyCategory: 'Category'
};

const ignoreKeys = ['_id', '__v'];

/* ========= Responsive Email Component ========= */
interface ResponsiveEmailProps {
  email: string;
}

const ResponsiveEmail: React.FC<ResponsiveEmailProps> = ({ email }) => {
  const [expanded, setExpanded] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 480; // Adjust breakpoint as needed

  // If on mobile and not expanded, show roughly half the email followed by ellipsis.
  const displayEmail =
    isMobile && !expanded
      ? email.substring(0, Math.floor(email.length / 2)) + '...'
      : email;

  return (
    <span>
      {displayEmail}{' '}
      {isMobile && (
        <ToggleButton onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'Show Full'}
        </ToggleButton>
      )}
    </span>
  );
};

/* ========= Hook to Get Window Width ========= */
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

/* ========= Styled Components ========= */
const Container = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #343a40;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const Panel = styled.div`
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  
`;

const PanelHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #495057;
`;

const DetailButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  z-index: 9999; /* Ensure it's above everything */
`;

const ModalContent = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 10000; /* Keep it above overlay */
`;



const ModalCloseButton = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalSection = styled.div`
  margin-bottom: 12px;
 z-200
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;


const ToggleButton = styled.button`
  border: none;
  background: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
`;

/* ========= Framer Motion Variants ========= */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4
    }
  })
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

/* ========= Main Component ========= */
const MatchCards: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetch('https://requsest-response.vercel.app/api/match/matches')
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches);
      })
      .catch((err) => console.error('Error fetching matches:', err));
  }, []);

  const openModal = (match: Match) => {
    setSelectedMatch(match);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMatch(null);
    setShowModal(false);
  };

  // Helper function to render details using the mapping objects.
  const renderDetails = (
    data: { [key: string]: any },
    mapping: Record<string, string>
  ) => {
    return (
      <>
        {Object.entries(data).map(([key, value]) => {
          if (ignoreKeys.includes(key)) return null;
          // Use the mapping if available; otherwise, fall back to the original key.
          const label = mapping[key] || key;
          return (
            <p key={key} style={{ margin: '4px 0' }}>
              <strong>{label}:</strong>{' '}
              {label === 'Email' ? (
                <ResponsiveEmail email={String(value)} />
              ) : (
                String(value)
              )}
            </p>
          );
        })}
      </>
    );
  };

  return (
    <Container>
      <Header className='text-2xl font-bold text-black'>Match Listings</Header>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <CardsWrapper>
          {matches.map((match, index) => (
            <Card
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Panel>
                <PanelHeader>Tenants</PanelHeader>
                <p>
                  <strong>{sellerMapping.landlordName}:</strong> {match.seller.landlordName}
                </p>
                <p>
                  <strong>{sellerMapping.landlordEmailAddress}:</strong>{' '}
                  <ResponsiveEmail email={match.seller.landlordEmailAddress} />
                </p>
                <p>
                  <strong>{sellerMapping.landlordPhoneNumber}:</strong> {match.seller.landlordPhoneNumber}
                </p>
                <p>
                  <strong>{sellerMapping.landlordPropertyAddress}:</strong> {match.seller.landlordPropertyAddress}
                </p>
                <p>
                  <strong>{sellerMapping.landlordPropertyType}:</strong> {match.seller.landlordPropertyType}
                </p>
                <p>
                  <strong>{sellerMapping.propertyCategory}:</strong> {match.seller.propertyCategory}
                </p>
              </Panel>
              <Panel>
                <PanelHeader>Landlord</PanelHeader>
                <p>
                  <strong>{buyerMapping.name}:</strong> {match.buyer.name}
                </p>
                <p>
                  <strong>{buyerMapping.emailAddress}:</strong>{' '}
                  <ResponsiveEmail email={match.buyer.emailAddress} />
                </p>
                <p>
                  <strong>{buyerMapping.phoneNumber}:</strong> {match.buyer.phoneNumber}
                </p>
                <p>
                  <strong>{buyerMapping.areaRequired}:</strong> {match.buyer.areaRequired}
                </p>
                <p>
                  <strong>{buyerMapping.propertyTypeSelect}:</strong> {match.buyer.propertyTypeSelect}
                </p>
                <p>
                  <strong>{buyerMapping.propertyCategory}:</strong> {match.buyer.propertyCategory}
                </p>
              </Panel>
              <DetailButton onClick={() => openModal(match)}>
                View Details
              </DetailButton>
            </Card>
          ))}
        </CardsWrapper>
      )}

      {/* Modal Popup */}
      {showModal && selectedMatch && (
        <ModalOverlay
          onClick={closeModal}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
        >
          <ModalContent onClick={(e) => e.stopPropagation()} variants={modalVariants}>
            <div style={{ position: 'relative', textAlign: 'center', padding: '0 20px' }}>
              <h2 style={{ margin: 0 }} className='text-black font-bold'>Match Details</h2>
              <ModalCloseButton 
                onClick={closeModal} 
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: '50%', 
                  transform: 'translateY(-50%)'
                }}
              >
                ×
              </ModalCloseButton>
            </div>

            <ModalSection>
              <h3 className='text-black font-bold'>Tenants Details</h3>
              {renderDetails(selectedMatch.seller, sellerMapping)}
            </ModalSection>
            <div className="border-b border-gray-400 mt-10"></div>
            <div className="border-b border-gray-400 mt-10"></div>
            <ModalSection>
              <h3 className='text-black font-bold mt-3'>Landlord Details</h3>
              {renderDetails(selectedMatch.buyer, buyerMapping)}
            </ModalSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MatchCards;