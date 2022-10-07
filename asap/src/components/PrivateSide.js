import React from "react";

const PrivateSide = () => {
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      {/* Sidebar scroll*/}
      <div
        className="scroll-sidebar ps-container ps-theme-default ps-active-y"
        data-sidebarbg="skin6"
        data-ps-id="d5ee0991-204d-1c76-8ad0-c7e614018723"
      >
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="in">
            {/* <li className="sidebar-item selected">
              {" "}
              <a
                className="sidebar-link sidebar-link active"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home feather-icon"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="hide-menu">Dashboard</span>
              </a>
            </li> */}
            {/* <li className="list-divider" /> */}
            {/* <li className="nav-small-cap">
              <span className="hide-menu">Tienda</span>
            </li> */}
            {/* <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-tag feather-icon"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1={7} y1={7} x2={7} y2={7} />
                </svg>
                <span className="hide-menu">Ticket List</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link sidebar-link"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-message-square feather-icon"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="hide-menu">Chat</span>
              </a>
            </li> */}
            {/* <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="#/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-calendar feather-icon"
                >
                  <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                  <line x1={16} y1={2} x2={16} y2={6} />
                  <line x1={8} y1={2} x2={8} y2={6} />
                  <line x1={3} y1={10} x2={21} y2={10} />
                </svg>
                <span className="hide-menu">Calendar</span>
              </a>
            </li> */}
            {/* <li className="list-divider" /> */}
            <li className="nav-small-cap">
              <span className="hide-menu">Administración</span>
            </li>
            {/* <li className="sidebar-item">
              {" "}
              <a className="sidebar-link has-arrow" href="#/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-text feather-icon"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1={16} y1={13} x2={8} y2={13} />
                  <line x1={16} y1={17} x2={8} y2={17} />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span className="hide-menu">Forms </span>
              </a>
              <ul className="collapse  first-level base-level-line">
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Form Inputs</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Form Grids</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Checkboxes &amp; Radios</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link has-arrow" href="#/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid feather-icon"
                >
                  <rect x={3} y={3} width={7} height={7} />
                  <rect x={14} y={3} width={7} height={7} />
                  <rect x={14} y={14} width={7} height={7} />
                  <rect x={3} y={14} width={7} height={7} />
                </svg>
                <span className="hide-menu">Tables </span>
              </a>
              <ul className="collapse  first-level base-level-line">
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Basic Table</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Dark Basic Table</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Sizing Table</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Coloured Table Layout</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Basic Datatables Layout</span>
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li className="sidebar-item">
              {" "}
              <a className="sidebar-link has-arrow" href="#/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bar-chart feather-icon"
                >
                  <line x1={12} y1={20} x2={12} y2={10} />
                  <line x1={18} y1={20} x2={18} y2={4} />
                  <line x1={6} y1={20} x2={6} y2={16} />
                </svg>
                <span className="hide-menu">Charts </span>
              </a>
              <ul className="collapse  first-level base-level-line">
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Morris Chart</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> ChartJs</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Knob Chart</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link has-arrow" href="#/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-box feather-icon"
                >
                  <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
                  <polyline points="2.32 6.16 12 11 21.68 6.16" />
                  <line x1={12} y1="22.76" x2={12} y2={11} />
                </svg>
                <span className="hide-menu">UI Elements </span>
              </a>
              <ul className="collapse  first-level base-level-line">
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Buttons</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Modals </span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Tabs </span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Tooltip &amp; Popover</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Notification</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Progressbar</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Typography</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Bootstrap UI</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Breadcrumb</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">List Media</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Grid </span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Carousel</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu">Scrollspy</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Toasts</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Spinner </span>
                  </a>
                </li>
              </ul>
            </li> */}
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/publicidad">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-dollar-sign"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                <line x1={9} y1={3} x2={9} y2={21} />
                <span className="hide-menu">Publicidad</span>
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link sidebar-link" href="/especialistas">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user"
                >
                  <line x1={12} y1={20} x2={12} y2={10} />
                  <line x1={18} y1={20} x2={18} y2={4} />
                  <line x1={6} y1={20} x2={6} y2={16} />
                </svg>

                <span className="hide-menu">Especialistas</span>
              </a>
            </li>

            {/* 
            
            Agregar Items aquí
            
            
          */}
            <li className="sidebar-item">
              <a className="sidebar-link sidebar-link" href="/administradores">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bar-chart feather-icon"
                >
                  <line x1={12} y1={20} x2={12} y2={10} />
                  <line x1={18} y1={20} x2={18} y2={4} />
                  <line x1={6} y1={20} x2={6} y2={16} />
                </svg>

                <span className="hide-menu">Administradores</span>
              </a>
            </li>

            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                <line x1={9} y1={3} x2={9} y2={21} />

                <span className="hide-menu">Perfil</span>
              </a>
            </li>

            {/* <li className="list-divider" />
            <li className="nav-small-cap">
              <span className="hide-menu">Authentication</span>
            </li>
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link sidebar-link"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-lock feather-icon"
                >
                  <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="hide-menu">Login</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link sidebar-link"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-lock feather-icon"
                >
                  <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="hide-menu">Register</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link has-arrow"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-feather feather-icon"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1={16} y1={8} x2={2} y2={22} />
                  <line x1="17.5" y1={15} x2={9} y2={15} />
                </svg>
                <span className="hide-menu">Icons</span>
              </a>
              <ul
                 
                className="collapse first-level base-level-line"
              >
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Fontawesome Icons </span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> Simple Line Icons </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link has-arrow"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-crosshair feather-icon"
                >
                  <circle cx={12} cy={12} r={10} />
                  <line x1={22} y1={12} x2={18} y2={12} />
                  <line x1={6} y1={12} x2={2} y2={12} />
                  <line x1={12} y1={6} x2={12} y2={2} />
                  <line x1={12} y1={22} x2={12} y2={18} />
                </svg>
                <span className="hide-menu">Multi level dd</span>
              </a>
              <ul
                 
                className="collapse first-level base-level-line"
              >
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> item 1.1</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> item 1.2</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  {" "}
                  <a
                    className="has-arrow sidebar-link"
                    href="#/"
                     
                  >
                    <span className="hide-menu">Menu 1.3</span>
                  </a>
                  <ul
                     
                    className="collapse second-level base-level-line"
                  >
                    <li className="sidebar-item">
                      <a href="#/" className="sidebar-link">
                        <span className="hide-menu"> item 1.3.1</span>
                      </a>
                    </li>
                    <li className="sidebar-item">
                      <a href="#/" className="sidebar-link">
                        <span className="hide-menu"> item 1.3.2</span>
                      </a>
                    </li>
                    <li className="sidebar-item">
                      <a href="#/" className="sidebar-link">
                        <span className="hide-menu"> item 1.3.3</span>
                      </a>
                    </li>
                    <li className="sidebar-item">
                      <a href="#/" className="sidebar-link">
                        <span className="hide-menu"> item 1.3.4</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebar-item">
                  <a href="#/" className="sidebar-link">
                    <span className="hide-menu"> item 1.4</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="list-divider" />
            <li className="nav-small-cap">
              <span className="hide-menu">Extra</span>
            </li>
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link sidebar-link"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit-3 feather-icon"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="hide-menu">Documentation</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link sidebar-link"
                href="#/"
                 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-log-out feather-icon"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1={21} y1={12} x2={9} y2={12} />
                </svg>
                <span className="hide-menu">Logout</span>
              </a>
            </li> */}
          </ul>
        </nav>
        {/* End Sidebar navigation */}
        <div className="ps-scrollbar-x-rail" style={{ left: 0, bottom: 0 }}>
          <div className="ps-scrollbar-x" tabIndex={0} style={{ left: 0, width: 0 }} />
        </div>
      </div>
      {/* End Sidebar scroll*/}
    </aside>
  );
};

export default PrivateSide;
