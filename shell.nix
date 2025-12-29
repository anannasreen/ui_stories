{
  pkgs ? import <nixpkgs> { },
}:

let
  nodejs = pkgs.nodejs-18_x;
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    # Core development tools
    nodejs
    watchexec

    # Build and test tools
    nodePackages.typescript
    nodePackages.typescript-language-server
    nodePackages.prettier

    # Development utilities
    git
    jq
    ripgrep
    
    # Optional: System dependencies if needed
    # imagemagick  # For image processing
    # ffmpeg      # For media handling
  ];

  shellHook = ''
    # Environment variables
    export PATH="$PWD/node_modules/.bin:$PATH"
    
    # Project-specific settings
    export NODE_ENV=development
    
    # Optional: Set up git hooks
    if [ -d .git ]; then
      git config core.hooksPath .git-hooks
    fi
    
    # Display project info
    echo "🚀 library UI Development Environment"
    echo "Node.js: $(node --version)"
    echo "NPM: $(npm --version)"
    echo "TypeScript: $(tsc --version)"
    
    # Optional: Auto-install dependencies if needed
    if [ ! -d node_modules ]; then
      echo "📦 Installing dependencies..."
      npm install
    fi
  '';

  # Environment variables available in the shell
  env = {
    STORYBOOK_PORT = "6006";
  };
}
