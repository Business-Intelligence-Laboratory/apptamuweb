import React from 'react';
import axios from 'axios';

const TamuList = () => {
  return (
    <div className="colums">
      <div className="column is-half">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Instansi</th>
              <th>Role</th>
              <th>No Identitias</th>
              <th>Jenis Kelamin</th>
              <th>Tanggal Kunjungan</th>
              <th>Status Kunjungan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Instansi</th>
              <th>Role</th>
              <th>No Identitias</th>
              <th>Jenis Kelamin</th>
              <th>Tanggal Kunjungan</th>
              <th>Status Kunjungan</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TamuList