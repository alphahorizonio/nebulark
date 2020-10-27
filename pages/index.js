import Link from "next/link";
import React from "react";

function Home() {
  return (
    <>
      <h1>Nebulark</h1>

      <nav>
        <ul>
          <li>
            <Link href="/examples/compute">Compute Examples</Link>
          </li>
          <li>
            <Link href="/examples/networking">Networking Examples</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Home;