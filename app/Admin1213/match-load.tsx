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
  formCreatedDate: string;
  [key: string]: any;
}

interface Match {
  seller: Seller;
  buyer: Buyer;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };
  

/* ========= Mapping Objects ========= */
const sellerMapping: Record<string, string> = {
    
  landlordName: 'Name',
  landlordPhoneNumber: 'Phone',
  landlordEmailAddress: 'Email',
  landlordPropertyAddress: 'Address',
  landlordPropertyType: 'Property Type',
  propertyCategory: 'Category',
  landlordRent: 'Rent',
  subscriptionStatus:'Subscription',
  emailsSent:'Email sent',
  formCreatedDate:'Created Date'
};

const buyerMapping: Record<string, string> = {
  name: 'Name',
  phoneNumber: 'Phone',
  emailAddress: 'Email',
  areaRequired: 'Address',
  propertyTypeSelect: 'Property Type',
  propertyCategory: 'Category',
  FirstLineofAddress:' Address',
  propertyAvailableDate:'Available Date',
  subscriptionStatus:'Subscription',
  formCreatedDate:'Created Date'
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #808080;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const DetailButton = styled.button`
  background-color: #b4a483;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

 
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
  z-index: 9999;
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
  z-index: 10000;
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
`;

const ToggleButton = styled.button`
  border: none;
  background: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

/* ========= Framer Motion Variants ========= */
const modalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

/* ========= Main Component ========= */
const MatchTable: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch data on mount
  useEffect(() => {
    fetch('https://requsest-response.vercel.app/api/match/matches')
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches);
      })
      .catch((err) => console.error('Error fetching matches:', err));
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMatches = matches.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(matches.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          const label = mapping[key] || key;

          // Format the date if the key is a date field
          const formattedValue =
            key.toLowerCase().includes('date') && value
              ? formatDate(value)
              : String(value);

          return (
            <p key={key} style={{ margin: '4px 0' }}>
              <strong>{label}:</strong>{' '}
              {label === 'Email' ? (
                <ResponsiveEmail email={formattedValue} />
              ) : (
                formattedValue
              )}
            </p>
          );
        })}
      </>
    );
  };
  const TenantCell = styled(TableCell)`
  background-color: #F4EDE9; // Light yellow color
`;

const LandlordCell = styled(TableCell)`
  background-color: #F6F2EF; // Light brown color
`;
const TenantModalSection = styled(ModalSection)`
  background-color: #F4EDE9; // Light yellow color
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const LandlordModalSection = styled(ModalSection)`
  background-color: #F6F2EF; // Light brown color
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

  return (
    <Container>
      <Header className="text-2xl font-bold text-black">Match Listings</Header>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        
        <>
        <TableContainer>
          <Table>
            <TableHeader>
            <TableRow>
                <TableHeaderCell>Tenant Name</TableHeaderCell>
                <TableHeaderCell>Tenant Email</TableHeaderCell>
                <TableHeaderCell>Tenant Phone</TableHeaderCell>
                <TableHeaderCell>Landlord Name</TableHeaderCell>
                <TableHeaderCell>Landlord Email</TableHeaderCell>
                <TableHeaderCell>Landlord Phone</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {currentMatches.map((match, index) => (
                <TableRow key={index}>
                <TenantCell>{match.seller.landlordName}</TenantCell>
                <TenantCell>
                 {match.seller.landlordEmailAddress} 
                </TenantCell>
                <TenantCell>{match.seller.landlordPhoneNumber}</TenantCell>
                <LandlordCell>{match.buyer.name}</LandlordCell>
                <LandlordCell>
                  {match.buyer.emailAddress}
                </LandlordCell>
                <LandlordCell>{match.buyer.phoneNumber}</LandlordCell>
                <TableCell>
                  <DetailButton className='bg-[#b4a483]' onClick={() => openModal(match)}>
                    View Details
                  </DetailButton>
                </TableCell>
              </TableRow>
              ))}
            </tbody>
          </Table>
          </TableContainer>

          {/* Pagination Controls */}
          <PaginationContainer>
            <PaginationButton
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <PaginationButton
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </PaginationContainer>
        </>
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
    <h2 style={{ margin: 0 }} className="text-black font-bold">
      Match Details
    </h2>
    <ModalCloseButton
      onClick={closeModal}
      style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      ×
    </ModalCloseButton>
  </div>

  <TenantModalSection>
    <h3 className="text-black font-bold">Tenant Details</h3>
    {renderDetails(selectedMatch.seller, sellerMapping)}
  </TenantModalSection>
  <div className="border-b border-gray-400 mt-10"></div>
  <LandlordModalSection>
    <h3 className="text-black font-bold mt-3">Landlord Details</h3>
    {renderDetails(selectedMatch.buyer, buyerMapping)}
  </LandlordModalSection>
</ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MatchTable;