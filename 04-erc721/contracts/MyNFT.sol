import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 public tokenId;
    uint256 public maxSupply;
    IERC20 public erc20Token;
    uint256 public mintPrice;

    constructor(uint256 _maxSupply, address _erc20Token, uint256 _mintPrice) ERC721("Shack", "SCKNFT") Ownable(msg.sender) {
        
        maxSupply = _maxSupply;
        erc20Token = IERC20(_erc20Token);
        mintPrice = _mintPrice;
    }

    function mint() public {
        require(tokenId < maxSupply, "Max supply reached");
        require(erc20Token.balanceOf(msg.sender) >= mintPrice, "Insufficient ERC20 token balance");
        require(erc20Token.allowance(msg.sender, address(this)) >= mintPrice, "Allowance too low");


        erc20Token.transferFrom(msg.sender, address(this), mintPrice);

        _safeMint(msg.sender, tokenId);
        _setTokenURI(
            tokenId,
            "https://gist.githubusercontent.com/MatchanJJ/2d4b2e21b59c647727dfc9bbc1773caa/raw/7e2760227e043d15ebf0a118a7a5440c6a7049a8/metadata.json"
        );
        tokenId++;
    }
}