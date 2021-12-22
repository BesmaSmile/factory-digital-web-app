import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import { format } from 'date-fns';
import ReimbursementModal from 'components/ReimbursementModal/ReimbursementModal';
import './Payments.scss';

const Payments = () => {
  const dispatch = useDispatch();
  const loadPayments = useCallback(actions.loadPayments(dispatch), [dispatch]);
  const { token } = useSelector((state) => state.auth);
  const { payments } = useSelector((state) => state.payment);
  const [selectedPayment, setSelectedPayment] = useState();

  useEffect(() => {
    try {
      if (!payments) {
        loadPayments(token);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="payments">
      <h2>Paiements</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">DATE DU PAIEMENT</th>
            <th scope="col">MONTANT</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, i) => {
            const reimbursements = payment.reimbursements.map((reimb) => `${reimb}€`).join('/');
            return (
              <tr
                key={i}
                data-bs-toggle="modal"
                data-bs-target="#reimbursementModal"
                onClick={() => setSelectedPayment(payment)}
              >
                <td>{format(new Date(payment.createdAt), 'dd/MM/yyyy')}</td>
                <td>{payment.amount}€<span className="red-text">{payment.reimbursements.length > 0 && '/'}{reimbursements}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="modal fade" id="reimbursementModal" tabIndex="-1" aria-labelledby="reimbursementModalLabel" aria-hidden="true">
        <ReimbursementModal payment={selectedPayment} />
      </div>
    </div>
  );
};

export default Payments;
