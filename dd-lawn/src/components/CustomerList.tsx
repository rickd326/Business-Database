import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link, useNavigate } from 'react-router-dom'
import CustomerEdit from './CustomerEdit'
import CustomerCreate from './CustomerCreate'
import { Database } from '../lib/supabaseSchema'
import { Contract } from '../types/index';  // Adjust the import path as necessary
import StyledSection from '../ui/StyledSectionTw';
import {TableHeader, TableCell} from '../ui/TableStylesTw';
import Button from '../ui/ButtonTw';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Database['public']['Tables']['customers']['Row'][]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Database['public']['Tables']['customers']['Row'][]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null)
  const [areas, setAreas] = useState<Database['public']['Tables']['areas']['Row'][]>([])
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null)
  const [contracts, setContracts] = useState<Contract[]>([]);
  const navigate = useNavigate()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [sortOption, setSortOption] = useState<string>('id-asc');

  useEffect(() => {
    fetchCustomers()
    fetchAreas()
    // Removed fetchContracts from here as it requires a customerId
  }, [])

  useEffect(() => {
    const sorted = [...customers].sort((a, b) => {
      switch (sortOption) {
        case 'id-asc':
          return a.customer_id - b.customer_id;
        case 'id-desc':
          return b.customer_id - a.customer_id;
        case 'last-name-asc':
          return a.last_name.localeCompare(b.last_name);
        case 'last-name-desc':
          return b.last_name.localeCompare(a.last_name);
        case 'area-asc':
          return (areas.find(area => area.area_id === a.area_id)?.area_name || '').localeCompare(
            areas.find(area => area.area_id === b.area_id)?.area_name || ''
          );
        case 'area-desc':
          return (areas.find(area => area.area_id === b.area_id)?.area_name || '').localeCompare(
            areas.find(area => area.area_id === a.area_id)?.area_name || ''
          ) * -1;
        default:
          return 0;
      }
    });

    const filtered = sorted.filter(customer => 
      (customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.street_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_id.toString().includes(searchTerm) ||
      customer.phone_1?.includes(searchTerm) ||
      customer.phone_2?.includes(searchTerm)) &&
      (selectedAreaId === null || customer.area_id === selectedAreaId)
    );

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, selectedAreaId, sortOption, areas]);

  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
    if (error) console.error('Error fetching customers:', error)
    else setCustomers(data || [])
  }

  const fetchAreas = async () => {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
    if (error) console.error('Error fetching areas:', error)
    else setAreas(data || [])
  }

  const handleNewCustomerAdded = (newCustomer: Database['public']['Tables']['customers']['Row']) => {
    setCustomers(prevCustomers => [...prevCustomers, newCustomer])
  }

  const handleOpenServices = (customerId: number) => {
    // Navigate to the CustomerServices page with the customerId
    navigate(`${customerId}/services`);
  };

  useEffect(() => {
    const filtered = customers.filter(customer => 
      (customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.street_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_id.toString().includes(searchTerm) ||
      customer.phone_1?.includes(searchTerm) ||
      customer.phone_2?.includes(searchTerm)) &&
      (selectedAreaId === null || customer.area_id === selectedAreaId)
    )
    setFilteredCustomers(filtered)
  }, [customers, searchTerm, selectedAreaId])

  const handleDelete = async (customerId: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('customer_id', customerId)
      if (error) console.error('Error deleting customer:', error)
      else fetchCustomers()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="inline-block w-1/4 px-1 py-2 mt-2 mx-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="inline-block w-1/4 px-4 py-2 mt-2 mx-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
      >
        <option value="id-asc">ID (Ascending)</option>
        <option value="id-desc">ID (Descending)</option>
        <option value="last-name-asc">Last Name (Ascending)</option>
        <option value="last-name-desc">Last Name (Descending)</option>
        <option value="area-asc">Area (Ascending)</option>
        <option value="area-desc">Area (Descending)</option>
      </select>
      <select
        value={selectedAreaId || ''}
        onChange={(e) => setSelectedAreaId(e.target.value ? Number(e.target.value) : null)}
        className="inline-block w-1/4 px-4 py-2 mt-2 mx-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
      >
        <option value="">All Areas</option>
        {areas.map(area => (
          <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
        ))}
      </select>
      <Button 
         
        onClick={() => setIsCreateModalOpen(true)}>
        New Customer
       </Button>
      

     
      <StyledSection title="List of Customers" isTable={true}>
        <table className="min-w-half divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <TableHeader text="ID" />
            <TableHeader text="Name" />
            <TableHeader text="Address" />
            <TableHeader text="Area" />
            <TableHeader text="Phone" />
            <TableHeader text="Edit" />
            <TableHeader text="Services" />
            <TableHeader text="Delete" />
            </tr>
          </thead>
       
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.customer_id}>
              <TableCell>{customer.customer_id}</TableCell>
              <TableCell>{`${customer.first_name} ${customer.last_name}`}</TableCell>
              <TableCell>{customer.street_address}</TableCell>
              <TableCell>
                {areas.find(area => area.area_id === customer.area_id)?.area_name || 'N/A'}
              </TableCell>
              <TableCell>{customer.phone_1}</TableCell>
              
              <TableCell>
                <Button 
                  
                  onClick={() => setEditCustomerId(customer.customer_id)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  
                  onClick={() => handleOpenServices(customer.customer_id)}>
                  Services
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  className="bg-red-700 hover:bg-red-900 text-white" 
                  onClick={() => handleDelete(customer.customer_id)}>
                  DELETE
                </Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
      </StyledSection>
      {editCustomerId && (
        <CustomerEdit
          customerId={editCustomerId}
          onClose={() => setEditCustomerId(null)}
          onCustomerUpdated={() => fetchCustomers()} // Handle customer update
        />
      )}
      {isCreateModalOpen && (
        <CustomerCreate
          onClose={() => setIsCreateModalOpen(false)}
          onCustomerAdded={handleNewCustomerAdded} // Pass the callback to CustomerCreate
        />
      )}
    </div>
  )
}

export default CustomerList
