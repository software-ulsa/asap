import { StepConnector, stepConnectorClasses } from "@mui/material";
import {
  AddHomeWorkRounded,
  ApartmentRounded,
  AssignmentRounded,
  ContactMailRounded,
  ContactPageRounded,
  ContactPhoneRounded,
  FaceRetouchingNaturalRounded,
  ImageRounded,
  LandscapeRounded,
  PersonRounded,
  SchoolRounded,
  SettingsSuggestRounded,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

export const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#00ace6",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0d803e",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#93a2b8",
    borderRadius: 1,
  },
}));

export const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  backgroundColor: ownerState.active
    ? "#00ace6"
    : ownerState.completed
    ? "#0d803e"
    : "#93a2b8",
  alignItems: "center",
}));

export function UsuarioStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonRounded />,
    2: <ContactPageRounded />,
    3: <ImageRounded />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export function PacienteStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ContactPhoneRounded />,
    2: <ContactMailRounded />,
    3: <SchoolRounded />,
    4: <FaceRetouchingNaturalRounded />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export function EspecialistaStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ContactPhoneRounded />,
    2: <ContactMailRounded />,
    3: <AddHomeWorkRounded />,
    4: <FaceRetouchingNaturalRounded />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export function NotaStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AssignmentRounded />,
    2: <LandscapeRounded />,
    3: <ImageRounded />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export function CursoStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AssignmentRounded />,
    2: <SettingsSuggestRounded />,
    3: <ImageRounded />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export function PublicidadStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AssignmentRounded />,
    2: <ApartmentRounded />,
    3: <ImageRounded />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
