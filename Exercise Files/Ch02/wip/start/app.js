(function() {
  "use strict"; //helps us avoid errors
  //IFFY - Immedeatly called. 
  // Start here


  function SizeSelector(props) {
    function sizeOptions() {

      return props.sizes.map(function(num) {
        return (
          <option value={num} key={num}> {num} </option>
        )
      });
    }
    
    function onSizeChange(evt)
    {
      //console.log('change event fired', evt.target.value);
      props.handelSizeChange(evt.target.value);
    }
    
    return (
      <div className="field-group">
								<label htmlFor="size-options">Size:</label>
								<select defaultValue={props.size} name="sizeOptions" id="size-options" onChange={onSizeChange}>
								//ID not a great choice is you are using a component that will be reused
									//could wrap all in the label
									{sizeOptions()}
								</select>
							</div>
    );
  }

function ColorSelector(props) {
    function colorOptions() {
      return props.colors.map(function(name) {
        return (
          <option value={name} key={name}>
            {name}
          </option>
        );
      });
    }
    
    function onColorChange(evt)
    {
      props.handelColorChange(evt.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <select defaultValue={props.color} name="colorOptions" id="color-options" onChange={onColorChange}>
          {colorOptions()}
        </select>
      </div>
    );
  }


  function ProductImage(props) {
    return (<img src={`../../../assets/${props.color}.jpg`} alt="Product Image" />);
  }

  var ProductCustomizer = createReactClass({
    getInitialState: function() {
      var sizes = window.Inventory.allSizes;
      var colors = window.Inventory.allColors;
      return {
        color: "red",
        colors: colors,
        size: 8,
        sizes: sizes
      };
    },
    
    handelSizeChange: function(selectedSize)
    {
     console.log('parent size change', selectedSize);
     var availColors = window.Inventory.bySize[selectedSize];
     
     this.setState({
        colors: availColors,
        size: selectedSize
     });
    },
    
    handelColorChange: function(selectedColor)
    {
     console.log('parent size color', selectedColor);
     var availSize = window.Inventory.byColor[selectedColor];
     
     this.setState({
        color: selectedColor,
        sizes: availSize
     });
     
     if(availSize.indexOf(this.state.size) === -1)
     {
       this.setState({ 
         size: availSize[0]
       })
     }
    },
    
    


    render: function() {
      return (
        <div className="customizer">
        <div className="product-image">
        <ProductImage color={this.state.color}/>
      </div>
      
      	<div className="selectors">
      	<SizeSelector size={this.state.size} sizes={this.state.sizes} handelSizeChange={this.handelSizeChange}/> 
      	<ColorSelector color={this.state.color} colors={this.state.colors} handelColorChange={this.handelColorChange} />
      	</div>
      </div>
      );
    }
  });


  ReactDOM.render(<ProductCustomizer/>,
    document.getElementById('react-root'));
})
();
