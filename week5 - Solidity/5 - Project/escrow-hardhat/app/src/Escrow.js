export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Contract </div>
          <div> {address} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} Ether</div>
        </li>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            if (parseFloat(value) > 0){
              handleApprove();
            }else{
              document.getElementById(address).className =
                'complete';
              document.getElementById(address).innerText =
                "✓ It's been approved!";
            }
          }}
        >
          {parseFloat(value) > 0 ? "Approve" : "Approved" }
        </div>
      </ul>
    </div>
  );
}
