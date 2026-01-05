"use client";

export default function LegalNotice() {
  return (
    <section
      id="legalnotice"
      className="w-full py-10 flex justify-center"
    >
      <div className="max-w-3xl w-full text-center" style={{ fontFamily: "Inter, sans-serif" }}>
        <h2 className="text-2xl font-bold mb-4 text-white">Legal Notice</h2>

        <p className="mb-6 text-slate-300">
          This section provides legal information about Green IT Repair and how to contact us.
        </p>

        <div className="space-y-4 text-slate-200 text-sm">
          <div>
            <h3 className="font-semibold">Company Information</h3>
            <p>Green IT Repair</p>
            <p>Recycling Street 12</p>
            <p>70599 Stuttgart, Germany</p>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>
            <p>Email: contact@greenit-repair.example</p>
            <p>Website: www.greenit-repair.example</p>
          </div>

          <div>
            <h3 className="font-semibold">Responsibility for Content</h3>
            <p className="text-slate-300">
              Green IT Repair is responsible for the content provided on this website. The information is intended
              for general guidance on sustainable device repair and reuse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}