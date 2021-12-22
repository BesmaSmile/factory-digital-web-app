/* eslint-disable react/prop-types */
import React, { useCallback, useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import './ReimbursementModal.scss';

const ReimbursementForm = ({ payment }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const reimburse = useCallback(actions.reimburse(dispatch), [dispatch]);
  const [successMessage, setSuccessMessage] = useState();

  const [error, setError] = useState();
  const initialValues = {
    amount: '',
    paymentId: payment?._id,
  };

  const totalReimbursement = payment?.reimbursements?.reduce((r1, r2) => r1 + r2, 0) ?? 0;
  const maxReimbursement = (payment?.amount ?? 0) - totalReimbursement;
  const validationSchema = yup.object({
    amount: yup.number().required('Champs obligatoire').max(maxReimbursement, `Vous pouvez rembourser au max ${maxReimbursement}€`),
  });

  useEffect(() => {
    setSuccessMessage();
  }, [payment]);

  const submit = async (values, action) => {
    try {
      await reimburse(token, values);
      setSuccessMessage('Remboursement effectué avec succès');
    } catch (err) {
      setError(err?.message);
    } finally {
      action.setSubmitting(false);
    }
  };

  return (
    <div className="reimbursement-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="reimbursementModalLabel">Remboursement</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {maxReimbursement > 0 ? (
              <>
                <h5 className="text-center"> Quel montant voulez vous rembourser?</h5>
                {payment && (
                  successMessage ? (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  ) : (
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={submit}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form method="#" onSubmit={handleSubmit}>
                          <div className="container">
                            {error && (
                              <div className="column">
                                <div className="col alert alert-danger" role="alert">
                                  {error}
                                </div>
                              </div>
                            )}
                            <div className="column field">
                              <div className="col">
                                <label htmlFor="amount" className="form-label">Montant à remboursrer (€)</label>
                              </div>
                              <div className="col">
                                <input
                                  type="amount"
                                  id="amount"
                                  className="form-control"
                                  name="amount"
                                  value={values.amount}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                              <div className="col error">
                                <span>{touched.amount && errors.amount}</span>
                              </div>
                            </div>
                            <div className="column">
                              <div className="modal-footer">
                                <button disabled={isSubmitting} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={isSubmitting} type="submit" className="btn btn-primary">Envoyer</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  )
                )}
              </>
            ) : (
              <div className="col alert alert-warning" role="alert">
                Il ne reste plus rien à rembourser
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementForm;
