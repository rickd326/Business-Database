import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link, useNavigate } from 'react-router-dom'
import CustomerEdit from './CustomerEdit'
import CustomerCreate from './CustomerCreate'
import { Database } from '../lib/supabaseSchema'
import ContractsModal from './ContractsModal'; // Import the ContractsModal component
import { Contract } from '../types/index';  // Adjust the import path as necessary


const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Database['public']['Tables']['customers']['Row'][]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Database['public']['Tables']['customers']['Row'][]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null)
  const [areas, setAreas] = useState<Database['public']['Tables']['areas']['Row'][]>([])
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null)
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    fetchCustomers()
    fetchAreas()
    fetchContracts(); // Implement this function based on your application's logic
  }, [])

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

  const fetchContracts = async () => {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
    if (error) console.error('Error fetching contracts:', error)
    else setContracts(data || [])
  }

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

  const handleNavigate = () => {
    navigate('/contracts')
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <h1>Customer List</h1>
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedAreaId || ''}
        onChange={(e) => setSelectedAreaId(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All Areas</option>
        {areas.map(area => (
          <option key={area.area_id} value={area.area_id}>{area.area_name}</option>
        ))}
      </select>
      <button onClick={() => setIsCreateModalOpen(true)}>New Customer</button>
      <button onClick={handleNavigate}>View Contracts</button>
      <button onClick={openModal} className="btn btn-primary">Contracts</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{`${customer.first_name} ${customer.last_name}`}</td>
              <td>{customer.street_address}</td>
              <td>{customer.phone_1}</td>
              <td>
                <button onClick={() => setEditCustomerId(customer.customer_id)}>Edit</button>
                <button onClick={openModal}>Contracts</button>
                <button onClick={() => handleDelete(customer.customer_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editCustomerId && (
        <CustomerEdit
          customerId={editCustomerId}
          onClose={() => setEditCustomerId(null)}
        />
      )}
      {isCreateModalOpen && (
        <CustomerCreate onClose={() => setIsCreateModalOpen(false)} />
      )}
      {isModalOpen && (
        <ContractsModal contracts={contracts} onClose={closeModal} />
      )}
    </div>
  )
}

export default CustomerList
