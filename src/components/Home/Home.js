import React, { useEffect, useCallback } from 'react';
import * as actions from 'store/actions';
import { useSelector, useDispatch } from 'react-redux';
import './Home.scss';

const Home = () => {
  const { payments } = useSelector((state) => state.payment);
  const totalPayments = payments?.map((payment) => payment.amount)
    .reduce((amount1, amount2) => amount1 + amount2, 0);
  const reimbursementsCount = payments?.map(
    (payment) => payment.reimbursements.length,
  ).reduce((count1, count2) => count1 + count2, 0);

  const totalReimbursements = payments?.map(
    (payment) => payment.reimbursements.reduce((r1, r2) => r1 + r2, 0),
  ).reduce((totalR1, totalR2) => totalR1 + totalR2, 0);

  const reimbursementsAvg = Math.round(totalReimbursements / reimbursementsCount);

  const dispatch = useDispatch();
  const loadPayments = useCallback(actions.loadPayments(dispatch), [dispatch]);
  const { token } = useSelector((state) => state.auth);
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
    <div className="home container">
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">SOMME DES PAIEMENTS</h6>
              <p className="card-text">{totalPayments} €</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">NOMBRE DE PAIEMENTS</h6>
              <p className="card-text">{payments?.length}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">TOTAL ENCAISSÉ</h6>
              <p className="card-text">{totalReimbursements} € ({reimbursementsCount})</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">MOYENNE DES REMBOURSEMENTS</h6>
              <p className="card-text">{reimbursementsAvg} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
